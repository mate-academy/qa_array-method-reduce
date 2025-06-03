'use strict';

/**
 * @param {function} callback
 * @param {*} startValue
 *
 * @returns {*}
 */
function reduce(array, callback, initialValue) {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  const hasInitialValue = arguments.length > 2;
  let acc = hasInitialValue ? initialValue : array[0];
  const startIndex = hasInitialValue ? 0 : 1;

  for (let i = startIndex; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }

  return acc;
}

module.exports = { reduce };
