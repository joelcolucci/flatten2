/**
 * @param {*} item
 * @return {Boolean}
 */
function isObject(item) {
  return item !== null && typeof item === 'object';
}

/**
 * @param {*} item
 * @return {Boolean}
 */
function isArray(item) {
  return Array.isArray(item);
}

/**
 * Strip right most character if equal to match
 * @param {string} str - string
 * @param {string} match - character to match
 * @return {string} - return string
 */
function stripRight(str, match) {
  var START_INDEX = 0;
  var END_INDEX = str.length - 1;

  if (str[END_INDEX] === match) {
    return str.substr(START_INDEX, END_INDEX);
  }

  return str;
};

/**
 * _createKeyPath
 * @param {string} path - nested object path
 * @param {string} key - key to add to path
 * @param {string} delimiter - delimiter
 * @return {string} - return concatted key path
 */
function createKeyPath(path, key, delimiter) {
  return [
    path,
    key,
    delimiter
  ].join('');
};

export {
  isObject,
  isArray,
  stripRight,
  createKeyPath
};
