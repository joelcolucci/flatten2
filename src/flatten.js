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

    // TODO: Create improved name
    var d = {};

    if (isArray(obj) || isObject(obj)) {
        for (var key in obj) {
            // TODO: extract into method?
            var keyPath = [
                path,
                key,
                DELIMITER
            ].join('');

            // Recursive flatten call
            var newD = flatten(obj[key], keyPath);

            $.extend(d, newD);
        }


    } else if (isScalar(obj)) {
        var endPath = path.substr(0, path.length - 1);

        d[endPath] = obj;
    }

    return d;
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
 * isArray
 * @param {}
 * @return {boolean}
 * 
 */

function isArray(value) {
    var type = $.type(value);

    return type === 'array';
}


/**
 * 
 * isObject
 * @param {}
 * @return {boolean}
 * 
 */

function isObject(value) {
    var type = $.type(value);

    return type === 'object';
}


/**
 * 
 * isScalar
 * @param {}
 * @return {boolean}
 * 
 */

function isScalar(value) {
    var type = $.type(value);

    return (type == "number" ||
        type == "string" ||
        type == "boolean" ||
        type == "null");
}