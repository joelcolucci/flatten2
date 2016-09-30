/**
 * 
 * Adapted/refactored from konklone adaptation of csvkit's recursive JSON flattening algorithm 
 * Konklone JSON - https://github.com/konklone/json/blob/gh-pages/assets/site.js#L28-L55
 * onyxfish csvkit - https://github.com/onyxfish/csvkit/blob/61b9c208b7665c20e9a8e95ba6eee811d04705f0/csvkit/convert/js.py#L15-L34
 * 
 */


var EMPTY_STRING = "";
var DELIMITER = "/";


/**
 * 
 * flattenObect
 * @param {object} obj - to flattening
 * @param {string} path - key path to current key
 * @returns {object}
 * 
 */

function flatten(obj, path) {
    if (path == undefined) {
        path = EMPTY_STRING;
    }

    var result = {};

    if (_isArray(obj) || _isObject(obj)) {
        for (var key in obj) {
            var newKey = _createKeyString(path, key, DELIMITER);
            
            var flattenedObject = flatten(obj[key], newKey); // Recursive call
            
            $.extend(result, flattenedObject);
        }
    } else if (_isScalar(obj)) {
        var endPath = _stripRight(path, DELIMITER);
        result[endPath] = obj;
    }

    return result;
}


/**
 * 
 * flattenMany
 * @param {array} data
 * @return {array}
 * 
 */

function flattenMany(data) {
    var flattenedObjects = [];

    for (var i = 0; i < data.length; i++) {
        var currentObject = data[i];

        var flatObject = flatten(currentObject);

        flattenedObjects.push(flatObject);
    }

    return flattenedObjects;
}


/**
 * 
 * _createKeyString
 * @param {string} path
 * @param {string} key
 * @param {string} delimiter
 * @return {string}
 * 
 */

function _createKeyString(path, key, delimiter) {
    return [
        path,
        key,
        DELIMITER
    ].join('');
}


/**
 * 
 * _stripRight
 * @param {string} str
 * @param {string} match
 * @return {string}
 * 
 */

function _stripRight(str, match) {
    var START_INDEX = 0;
    var END_INDEX = str.length - 1;

    if (str[END_INDEX] === match) {
        return str.substr(START_INDEX, END_INDEX); 
    }

    return str;
}


/**
 * 
 * _isArray
 * @param {}
 * @return {boolean}
 * 
 */

function _isArray(value) {
    var type = $.type(value);

    return type === 'array';
}


/**
 * 
 * _isObject
 * @param {}
 * @return {boolean}
 * 
 */

function _isObject(value) {
    var type = $.type(value);

    return type === 'object';
}


/**
 * 
 * _isScalar
 * @param {}
 * @return {boolean}
 * 
 */

function _isScalar(value) {
    var type = $.type(value);

    return (type == "number" ||
        type == "string" ||
        type == "boolean" ||
        type == "null");
}