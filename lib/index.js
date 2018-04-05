'use strict';

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

function isObject(obj) {
  return obj === Object(obj)
    && Object.prototype.toString.call(obj) !== '[object Array]';
}

export {
  flatten,
  flattenMany
};
