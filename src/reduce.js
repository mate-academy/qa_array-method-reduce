'use strict';

/**
 * @param {function} callback
 * @param {*} startValue
 *
 * @returns {*}
 */
function reduce(callback, startValue) {
  let prev = startValue;
  let startIndex = 0;

  if (typeof callback !== 'function') {
    throw new Error('Callback has to be function.');
  }

  if (arguments.length < 2) {
    startIndex = 1;
    prev = this[0];
  }

  if (arguments.length < 2 && this.length === 0) {
    throw new Error('Array can not be empty.');
  }

  for (let i = startIndex; i < this.length; i++) {
    prev = callback(prev, this[i], i, this);
  }

  return prev;
}

module.exports = { reduce };
