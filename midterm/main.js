// Load a Google Map on the page and set the
// center of the map to: 36.05178307933835, 42.49737373046878
var mapDiv = document.getElementById('map-canvas');
var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(36.05178307933835, 42.49737373046878),
    zoom: 2
});
var bounds = new google.maps.LatLngBounds();
var infoWindow = new google.maps.InfoWindow();

var events = {
  templateFunction: Handlebars.compile($('#event-template').html()),
  render: function(data) {
    var html = '';

    for (var i = 0; i < data.events.event.length; i++) {
      html += this.templateFunction(data.events.event[i]);
    }

    $('#info-pane').html(html);
  }
};

var markers = {
  addMarkers: function(data) {
    for (var i in data.events.event) {
      current = data.events.event[i];
      currentLocation = new google.maps.LatLng(current.latitude, current.longitude);
      bounds.extend(currentLocation);

      var marker = new google.maps.Marker({
        map: map, animation: google.maps.Animation.DROP,
        position: currentLocation, clickable: true,
        title: current.title + ' at ' + current.venue_name
      });
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(this.title);
        infoWindow.open(map, this);
      });
      map.setCenter(currentLocation);
    }
  }
};

// When the page loads, make a JSONP request
$(window).load(function() {
  url = 'http://api.eventful.com/json/events/search?c=music&app_key=mNDQ3Xkbp9nZhWmj&page_number=1&date=Future&keywords=disclosure&callback=?'
  $.getJSON(url, function(response) {
    events.render(response);
    markers.addMarkers(response);
  });
});
