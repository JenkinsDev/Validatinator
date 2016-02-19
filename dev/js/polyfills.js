module.exports = function() {
  if (!String.prototype.contains) {
    String.prototype.contains = function(str, startIndex) {
      return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
      if (this === undefined || this === null) {
        throw new TypeError( '"this" is null or not defined' );
      }

      // Hack to convert object.length to a UInt32
      var length = this.length >>> 0;

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }

      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      for (; fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }

      return -1;
    };
  }
}
