var mapDiv = document.getElementById('map-canvas');
var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(51.1788, 1.8262),
    zoom: 1
});

if (navigator.geolocation) { //Feature detection
  // Geolocation supported. Do something here.

  var success_handler = function(position) {
    var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({latLng: userLocation}, function(data) {
      if (data.length > 0) {
        var infowindow = new google.maps.InfoWindow({
          content: 'Your address is:<br>' + data[0].formatted_address,
        });
        var marker = new google.maps.Marker({
          map: map,
          position: userLocation,
          animation: google.maps.Animation.DROP,
          icon: 'home-48.png',
          clickable: true,
          title: 'Your location!'
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      }

      map.setCenter(userLocation);
      map.setZoom(16);
    });

  };
  var error_handler = function(err) {
    console.log('ERROR with geolocation: ' + err);
  };
  var options = {};

  navigator.geolocation.getCurrentPosition(success_handler, error_handler, options);
}