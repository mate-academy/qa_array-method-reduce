'use strict';  

/**
 * Custom implementation of Array.prototype.reduce
 *
 * @param {function} callback
 * @param {*} startValue
 *
 * @returns {*}
 */
function reduce(callback, startValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  let prev;
  let startIndex = 0;

  if (arguments.length < 2) {
    if (this.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    prev = this[0];
    startIndex = 1;
  } else {
    prev = startValue;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (!(i in this)) continue; // skip sparse array holes
    prev = callback(prev, this[i], i, this);
  }

  return prev;
}

module.exports = { reduce };
