var movieList = {
  templateFunction: Handlebars.compile($('#movie-template').html()),

  setLoading: function() {
    $('#results').html('Loading...');
  },

  render: function(response) {
    var html = '';

    for (var i = 0; i < response.movies.length; i++) {
      html += this.templateFunction(response.movies[i]);
    }

    $('#results').html(html);
  }
};

var rottenTomatoesApi = {
  search: function(searchTerm) {
    // getJSON expects callback=?
    url = ('http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=' + searchTerm +
      '&page_limit=40&page=1&apikey=wep2twcdnse3q58wypnephew&callback=?');

    $.getJSON(url, function(response) {
      movieList.render(response);
    });
  }
};

$('form').on('submit', function(e) {
  e.preventDefault();

  var searchTerm = $('#search-term').val();

  movieList.setLoading();
  rottenTomatoesApi.search(searchTerm);
});