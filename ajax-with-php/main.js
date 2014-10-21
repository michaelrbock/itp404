var templateFunction = Handlebars.compile($('#model-template').html());

$('form#makes').on('submit', function(e) {
  e.preventDefault();
  e.returnValue = false;

  var make = $.trim($('input#make').val().toLowerCase());
  if (make == '') {
    return;
  }

  $('ul#results').text('Loading...');

  var url = './edmunds.php?make=' + make;

  $.getJSON(url, function(response) {
    if (response.models.length > 0) {
      $('div#error').text('');
    }
    else {
      $('div#error').text('No results for that query');
    }

    html = '';
    for (var i = 0; i < response.models.length; i++) {
      html += templateFunction({make: make, data: response.models[i]});
    }
    $('ul#results').html(html);
  });
});