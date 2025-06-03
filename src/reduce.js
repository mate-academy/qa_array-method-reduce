'use strict';

/**
 * @param {function} callback - Function to execute on each element
 * @param {*} startValue - Initial value for the accumulator
 *
 * @returns {*} - Final accumulated result
 */
function reduce(callback, startValue) {
  let prev = startValue;
  let startIndex = 0;

  // Throw error if array is empty and no initial value is provided
  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  // If no startValue is provided, use the first element as initial value
  if (arguments.length < 2) {
    startIndex = 1;
    prev = this[0];
  }

  // Loop through the array and apply the callback function
  for (let i = startIndex; i < this.length; i++) {
    prev = callback(prev, this[i], i, this);
  }

  return prev;
}

module.exports = { reduce };
