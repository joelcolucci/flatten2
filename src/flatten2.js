/**
 *
 * Adapted/refactored from konklone adaptation of csvkit's recursive JSON flattening algorithm
 * Konklone JSON - https://github.com/konklone/json/blob/gh-pages/assets/site.js#L28-L55
 * onyxfish csvkit - https://github.com/onyxfish/csvkit/blob/61b9c208b7665c20e9a8e95ba6eee811d04705f0/csvkit/convert/js.py#L15-L34
 *
 */

'use strict';

var f2 = f2 || {};

f2.defaults = {
  delimiter: '/'
};


/**
 *
 * flattenObect
 * @param {object} obj - to flattening
 * @param {string} path - key path to current key
 * @returns {object}
 *
 */

f2.flatten = function(obj, path) {
  if (path == undefined) {
    path = "";
  }

  var result = {};

  if (f2._isArray(obj) || f2._isObject(obj)) {
    for (var key in obj) {
      var keyPath = f2._createKeyPath(path, key, f2.defaults.delimiter);

      var flattenedObject = f2.flatten(obj[key], keyPath); // Recursive call

      $.extend(result, flattenedObject);
    }
  } else if (f2._isScalar(obj)) {
    var endPath = f2._stripRight(path, f2.defaults.delimiter);
    result[endPath] = obj;
  }

  return result;
};


/**
 *
 * flattenMany
 * @param {array} data
 * @return {array}
 *
 */

f2.flattenMany = function(data) {
  var flattenedObjects = [];

  for (var i = 0; i < data.length; i++) {
    var currentObject = data[i];

    var flatObject = f2.flatten(currentObject);

    flattenedObjects.push(flatObject);
  }

  return flattenedObjects;
};


/**
 *
 * _createKeyPath
 * @param {string} path
 * @param {string} key
 * @param {string} delimiter
 * @return {string}
 *
 */

f2._createKeyPath = function(path, key, delimiter) {
  return [
    path,
    key,
    f2.defaults.delimiter
  ].join('');
};


/**
 *
 * _stripRight
 * @param {string} str
 * @param {string} match
 * @return {string}
 *
 */

f2._stripRight = function(str, match) {
  var START_INDEX = 0;
  var END_INDEX = str.length - 1;

  if (str[END_INDEX] === match) {
    return str.substr(START_INDEX, END_INDEX);
  }

  return str;
};


/**
 *
 * _isArray
 * @param {}
 * @return {boolean}
 *
 */

f2._isArray = function(value) {
  var type = $.type(value);

  return type === 'array';
};


/**
 *
 * _isObject
 * @param {}
 * @return {boolean}
 *
 */

f2._isObject = function(value) {
  var type = $.type(value);

  return type === 'object';
};


/**
 *
 * _isScalar
 * @param {}
 * @return {boolean}
 *
 */

f2._isScalar = function(value) {
  var type = $.type(value);

  return (type === "number" ||
    type === "string" ||
    type === "boolean" ||
    type === "null");
};
