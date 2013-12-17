/**
 *  Adds support for String.prototype.contains for browsers that do not
 *  currently have it implemented.
 *
 *  @Added: 12/15/2013
 */
if (!('contains' in String.prototype)) {
    String.prototype.contains = function(str, startIndex) {
        return -1 !== String.prototype.indexOf.call(this, str, startIndex);
    };
}