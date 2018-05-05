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

// MODELS
function Location(title, latitude, longitude, number) {
    var self = this;
    self.Title = title;
    self.Latitude = latitude;
    self.Longitude = longitude;
    self.Number = number;
}

// FUCNTIONS
function addUserMarker(position) {

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        title: "Your location",
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    marker.setMap(map);

    setWeather(position.coords.latitude, position.coords.longitude);
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