$(document).ready(function () {

    var scroll_start = 0;
    var startchange = $('#navbar');
    var offset = startchange.offset();

    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $(".navbar-dark").css('background-color', '#5b605d');
            } else {
                $('.navbar-dark').css('background-color', 'transparent');
            }
        });
    }
});

// GLOBALS
var map = null;
var address = null;
var geocoder = new google.maps.Geocoder();
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;

// MODELS
function Location(title, latitude, longitude, number) {
    var self = this;
    self.Title = title;
    self.Latitude = latitude;
    self.Longitude = longitude;
    self.Number = number;
}

// EVENTS
$('#mode').on('change', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(calculateRoute, showError, { maximumAge: 0 });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});


// FUCNTIONS
function calculateRoute(position) {

    var selectedMode = $('#mode').val();
    var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    directionsService.route({
        origin: start,
        destination: address,
        travelMode: selectedMode
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function addUserMarkerWithWeather(position) {

    addUserMarker(position);

    setWeather(position.coords.latitude, position.coords.longitude);
}

function addUserMarker(position) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        title: "Your location",
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    marker.setMap(map);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

function checkNumber() {
    var x, text;

    // Get the value of the input field with id="numb"
    x = document.getElementById("myInput2").value;

    // If x is Not a Number or less than one or greater than 10
    if (isNaN(x)) {
        text = "Error:Input must not be null";
    } else if (x.length > 4 || x.length < 4) {
        text = "Error:Input must be 4 digits";
    } else if (x == 1234) {
        text = "Error:Input invailded with no post code is 1234 ";
    } else if (!(x.startsWith("3"))) {
        text = "Error:Input must be start with number 3 ";
    } else {
        text = null;
        var x = document.getElementById("mySelect").value;
        if (x == '1') {
            myFunction();
        }
        if (x == '2') {
            myFunction2();

        }
    }
    document.getElementById("demo").innerHTML = text;
}

function setWeather(latitude, longitude) {

    var apiKey = 'b5720867ff3d98c666593de2ef32f09b';
    var url = 'https://api.forecast.io/forecast/';

    $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function (data) {

        var celsius = ((data.currently.temperature - 32) / 1.8).toFixed(2);

        $('#weather-degrees').text(celsius + "°C");
        $('#weather-icon').removeClass();

        switch (data.currently.icon) {
            case "sun":
                $('#weather-icon').addClass("ion-ios-sunny-outline");
                break;
            case "rain":
                $('#weather-icon').addClass("ion-ios-rainy-outline");
                break;
            case "partly-cloudy-day":
                $('#weather-icon').addClass("ion-ios-partlysunny-outline");
                break;
        }

        $('#temp').html('Current temperature is ' + celsius + '° C ' + 'and the weather is ' + data.currently.summary);
        $('#temp2').html('This week forecast: ' + data.daily.summary);

        $('#icon').html(data.currently.icon);
        $('#minutely').html(data.minutely.summary);
    });
}

function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP
        });

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}

function initDetails() {

    address = "555 swanston street";

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {

            map = new google.maps.Map(document.getElementById('details_map'), {
                center: results[0].geometry.location,
                zoom: 17
            });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(results[0].geometry.location.Latitude, results[0].geometry.location.Longitude),
                title: address
            });

            marker.setMap(map);

            var bounds = new google.maps.LatLngBounds();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('right-panel'));

            var control = document.getElementById('floating-panel');
            control.style.display = 'block';
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: results[0].geometry.location,
                radius: 500,
                type: 'cafe'
            }, processResults);

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: results[0].geometry.location,
                radius: 500,
                type: 'parking'
            }, processResults);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(calculateRoute, showError, { maximumAge: 0 });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPopup(url) {
    newwindow = window.open(url, 'name', 'height=250,width=500,top=250,left=400,resizable');
    if (window.focus) { newwindow.focus() }
}
