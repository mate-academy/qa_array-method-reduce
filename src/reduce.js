'use strict';

/**
 * @param {function} callback
 * @param {*} startValue
 *
 * @returns {*}
 */
function reduce(callback, startValue) {
  if (typeof callback !== 'function') {
    throw new Error('Callback should be a function');
  }

  let prev = startValue;
  let startIndex = 0;

  if (arguments.length < 2 && this[0]) {
    startIndex = 1;
    prev = this[0];
  } else if (arguments.length < 2 && !this[0]) {
    throw new Error('Array must not be empty or InitValue should be specified');
  }

  for (let i = startIndex; i < this.length; i++) {
    prev = callback(prev, this[i], i, this);
  }

  return prev;
}

module.exports = { reduce };
