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

    $('input.column_filter').on('keyup click', function () {
        filterColumn2($(this).parents('tr').attr('data-column'));
        filterColumn3($(this).parents('tr').attr('data-column'));
    });

    $('#clothes tbody tr:even').addClass("silver");
    $('#clothes tbody tr').mouseover(function () {
        $(this).addClass('dataHover');
    });
    $('#clothes tbody tr').mouseout(function () {
        $(this).removeClass('dataHover');
    });

    $('#data tbody tr:even').addClass("silver");
    $('#data tbody tr').mouseover(function () {
        $(this).addClass('dataHover');
    });
    $('#data tbody tr').mouseout(function () {
        $(this).removeClass('dataHover');
    });

    $('#AspNetUser tbody tr:even').addClass("silver");
    $('#AspNetUser tbody tr').mouseover(function () {
        $(this).addClass('dataHover');
    });
    $('#AspNetUser tbody tr').mouseout(function () {
        $(this).removeClass('dataHover');
    });
});

function filterColumn(i) {
    $('#article').DataTable().column(i).search(
        $('#col' + i + '_filter').val(),
        //,
        //$('#col'+i+'_regex').prop('checked'),
        $('#col' + i + '_smart')
    ).draw();
}

function filterColumn2(i) {
    $('#data').DataTable().column(i).search(
        $('#col' + i + '_filter').val(),
        //,
        //$('#col'+i+'_regex').prop('checked'),
        $('#col' + i + '_smart')
    ).draw();
}

function filterColumn3(i) {
    $('#AspNetUser').DataTable().column(i).search(
        $('#col' + i + '_filter').val(),
        //,
        //$('#col'+i+'_regex').prop('checked'),
        $('#col' + i + '_smart')
    ).draw();
}

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}




/* ===== Blood_Details ===== */

// Variables
var map;
var final_latitude = 0;
var final_longitude = 0;

// display the cafe restaurant point
function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);
    }
}

//create the point for cafe near by
function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();


    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
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

        //google.maps.event.addListener(image, 'click', function () {
        //    infowindow.setContent(places.name);
        //    infowindow.open(map, this);
        //});

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}