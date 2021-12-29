/**
 * @param {function} callback
 * @param {*} startValue
 *
 * @returns {*}
 */
function reduce(callback, startValue) {
  let prev = startValue;
  let startIndex = 0;

  if (arguments.length < 2) {
    startIndex = 1;
    prev = this[0];
  }

  for (let i = startIndex; i < this.length; i++) {
    prev = callback(prev, this[i], i, this);
  }

  return prev;
}

module.exports = { reduce };
