var myFirebaseRef = new Firebase("https://bookmarklist.firebaseio.com/");

var bookmarkList = {
  $bookmarks: $('#bookmarks'),

  data: [
    {
      name: 'StackOverflow',
      url: 'http://stackoverflow.com/'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/'
    },
    {
      name: 'HackerNews',
      url: 'https://news.ycombinator.com/'
    }
  ],

  /**
   * Takes a single bookmark object and creates some HTML
   * @param {Object} bookmark
   * @return {String} html for one bookmark link
   */
  createBookmarkHtml: function(bookmark) {
    return '<a href="' + bookmark.url + '">' + bookmark.name + '</a>';
  },

  /**
   * Renders an array of bookmark objects in #bookmarks
   * @param {Array} bookmarks
   */
  render: function() {
    var html = '';
    for (var i = 0; i < this.data.length; i++) {
      html = html + '<li>' + this.createBookmarkHtml(this.data[i]) + '</li>';
    }
    this.$bookmarks.html(html);
  },

  /**
   * Appends a bookmark object to the #bookmarks and the bookmarks array
   * @param {Object} bookmark
   */
  addOne: function(bookmark) {
    this.data.push(bookmark);
    myFirebaseRef.push(bookmark);
    this.render();
  }
};

var bookmarkValidation = {
  /**
  * @param {String} url
  * @return {Boolean} True if url is valid, false if otherwise
  */
  hasValidUrl: function(url) {
    var regex = /^https?:\/\/.+$/;
    return regex.test(url);
  },

  /**
  * @param {String} s
  * @return {Boolean} True if s.length > 0
  */
  isNotEmpty: function(s) {
    return (s.length > 0);
  },

  /**
  * @param {Object} bookmark object
  * @return {Boolean} True if url is valid and name is not empty
  */
  passes: function(bookmark) {
    if (this.isNotEmpty(bookmark.name) && this.hasValidUrl(bookmark.url)) {
      return true;
    } else {
      return false;
    }
  }
};

bookmarkList.render();

$('form#add-bookmark').on('submit', function(e) {
  e.preventDefault();
  e.returnValue = false;

  newBookmark = {
    name: $('input#name').val(),
    url: $('input#url').val()
  };
  $error = $('div#error');

  if (bookmarkValidation.passes(newBookmark)) {
    $error.text('');
    $('input#name').val('');
    $('input#url').val('');
    bookmarkList.addOne(newBookmark);
  }
  else {
    if ($error.text().length == 0) {
      $error.text('The name field is required and the url field must be a valid URL');
    }
  }
});
