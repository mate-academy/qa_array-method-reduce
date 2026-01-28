'use strict';

/**
 * @param {function} callback
 * @param {*} startValue
 *
 * @returns {*}
 */
function reduce(callback, startValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  const length = arr.length;
  let i = 0;
  let accumulator;

  if (arguments.length >= 2) {
    accumulator = startValue;
  } else {
    // Find first defined element
    while (i < length && !(i in arr)) {
      i++;
    }

    if (i >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = arr[i];
    i++;
  }

  for (; i < length; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
}

module.exports = { reduce };
