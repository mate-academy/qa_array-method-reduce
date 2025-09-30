'use strict';

/**
 * @param {function} callback
 * @param {*} initialValue
 * @returns {*}
 */
function reduce(callback, initialValue) {
  if (this == null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = Object(this);
  const len = arr.length >>> 0;

  let k = 0;
  let accumulator;

  if (arguments.length > 1) {
    accumulator = initialValue;
  } else {
    // шукаємо перший існуючий елемент
    while (k < len && !(k in arr)) {
      k++;
    }

    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = arr[k++];
  }

  for (; k < len; k++) {
    if (k in arr) {
      accumulator = callback(accumulator, arr[k], k, arr);
    }
  }

  return accumulator;
}

module.exports = { reduce };
