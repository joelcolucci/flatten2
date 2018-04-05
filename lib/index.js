'use strict';

import { isObject } from './utilities';

const DELIMITER = '/';

function flatten(value, keyPath='', flattenedObject={}) {
  if (!isObject(value)) {
    flattenedObject[keyPath] = value;
    return;
  }

  for (let [key, val] of Object.entries(value)) {
    let newKeyPath;
    if (keyPath === '') {
      newKeyPath = `${key}`;
    } else {
      newKeyPath = `${keyPath}${DELIMITER}${key}`;
    }

    flatten(val, newKeyPath, flattenedObject);
  }

  return flattenedObject;
}

function flattenMany(data) {
  return data.map((obj) => {
    return flatten(obj);
  });
};

export {
  flatten,
  flattenMany
};
