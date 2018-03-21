'use strict';
/**
 * Adapted/refactored from konklone adaptation of
 * csvkit's recursive JSON flattening algorithm
 * Konklone JSON
 * - https://github.com/konklone/json/blob/gh-pages/assets/site.js#L28-L55
 * onyxfish csvkit
 * - https://github.com/onyxfish/csvkit/blob/61b9c208b7665c20e9a8e95ba6eee811d04705f0/csvkit/convert/js.py#L15-L34
 */

import { isArray, isObject, stripRight, createKeyPath } from './utilities';

const DELIMITER = '/';

/**
 * flatten
 * @param {object} obj - to flattening
 * @param {string} path - key path to current key
 * @return {object} - return flattened object
 */
function flatten(obj, path) {
  if (path == undefined) {
    path = '';
  }

  let result = {};

  if (isArray(obj) || isObject(obj)) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyPath = createKeyPath(path,
          key, DELIMITER);

        let flattenedObject = flatten(obj[key], keyPath); // Recursive call

        Object.assign(result, flattenedObject);
      }
    }
  } else {
    let endPath = stripRight(path, DELIMITER);
    result[endPath] = obj;
  }

  return result;
};

/**
 * flattenMany
 * @param {array} data - array of objects to flatten
 * @return {array} - return array of flattened objects
 */
function flattenMany(data) {
  return data.map((obj) => {
    return flatten(obj);
  });
};

export {
  flatten,
  flattenMany
};
