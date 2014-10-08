var jQuery = function(selector) {
  if (this instanceof jQuery) {
    this.elements = document.querySelectorAll(selector);
  }
  else {
    return new jQuery(selector);
  }
};

jQuery.prototype.html = function() {
  // set HTML
  if (arguments.length > 0) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = arguments[0];
    }
    return this;
  }
  // return HTML of first element
  else {
    return this.elements[0].innerHTML;
  }
};

jQuery.prototype.css = function() {
  // take in array of object (key-value pairs)
  if (arguments.length == 1) {
    for (var style in arguments[0]) {
      value = arguments[0][style];
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style[style] = value;
      }
    }
  }
  // take in key-value pair
  else if (arguments.length == 2) {
    var style = arguments[0];
    var value = arguments[1];
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].style[style] = value;
    }
  }
  return this;
};

jQuery.prototype.attr = function() {
  // return value of attribute for first element
  if (arguments.length == 1) {
    return this.elements[0].getAttribute(arguments[0]);
  }
  // set attribute to value
  else {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].setAttribute(arguments[0], arguments[1]);
    }
    return this;
  }
};

jQuery.each = function(iter, callback) {
  if (iter instanceof Array) {
    for (var i = 0; i < iter.length; i++) {
      callback(i, iter[i]);
    }
  }
  // else if iter is Object
  else {
    for (var key in iter) {
      callback(key, iter[key]);
    }
  }
};

window.$ = jQuery;