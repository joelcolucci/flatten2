describe('flatten2', function() {


  describe('flatten', function() {
    var data;
    var flattenedData;

    beforeEach(function() {
      data = {
        "patriots": {
          "coaches": {
            "head": "bill",
            "oline": "scarnecchia"
          }
        },
        "myNumber": 12,
        "myBoolean": true,
        "myString": 'hello',
        "myNull": null,
        "nestedTypes": {
          "myNumber": 12,
          "myBoolean": true,
          "myString": 'hello',
          "myNull": null,
        }
      };

      flattenedData = f2.flatten(data);
    });

    it('should concat nested object keys', function() {
      expect('patriots/coaches/head' in flattenedData).toBe(true);
      expect('patriots/coaches/oline' in flattenedData).toBe(true);
    });

    it('should maintain values for concatted nested keys', function() {
      expect(flattenedData['patriots/coaches/head']).toBe('bill');
      expect(flattenedData['patriots/coaches/oline']).toBe('scarnecchia');
    });

    it('should maintain scalar data types', function() {
      expect(typeof flattenedData.myNumber).toBe('number');
      expect(typeof flattenedData.myBoolean).toBe('boolean');
      expect(typeof flattenedData.myString).toBe('string');
      expect(flattenedData.myNull).toBe(null);
    });

    it('should maintain nested scalar data types', function() {
      expect(typeof flattenedData['nestedTypes/myNumber']).toBe('number');
      expect(typeof flattenedData['nestedTypes/myBoolean']).toBe('boolean');
      expect(typeof flattenedData['nestedTypes/myString']).toBe('string');
      expect(flattenedData['nestedTypes/myNull']).toBe(null);
    });

    it('should flatten all object values', function() {
      expect(isFlattened(flattenedData)).toBe(true);
      expect(isFlattened(data)).toBe(false);
    });

  });


  describe('flattenMany', function() {

    var data;

    beforeEach(function() {
      data = [{
          "title": "Creativity Inc",
          "author": "Ed Catmull",
          "meta": {
            "keywords": "business,leadership",
            "genre": "businees"
          }
        },
        {
          "title": "Ego is the Enemy",
          "author": "Ryan Holiday",
          "meta": {
            "keywords": "philosophy",
            "genre": "philosophy"
          }
        }
      ];
    });

    it('flatten all objects in an array', function() {
      var flattenedData = f2.flattenMany(data);

      var isAllFlattened = true;

      for (var i = 0, n = flattenedData.length; i < n; i++) {
        var currentObject = flattenedData[i];
        if (!isFlattened(currentObject)) {
          isAllFlattened = false;
          break;
        }
      }

      expect(isAllFlattened).toBe(true);
    });

  });


  describe('_createKeyPath', function() {

    var PATH,
      KEY,
      DELIMITER;

    beforeEach(function() {
      PATH = 'hello/';
      KEY = 'world';
      DELIMITER = '/';
    });

    it('should concat args', function() {
      var keyPath = f2._createKeyPath(PATH, KEY, DELIMITER);

      expect(keyPath).toBe('hello/world/');
    });

  });


  describe('_stripRight', function() {

    var DELIMITER,
      STR;

    beforeEach(function() {
      DELIMITER = '/';
      STR = 'hello/world/';
    });

    it('should remove right most char if delimiter', function() {
      var strippedPath = f2._stripRight(STR, DELIMITER);

      expect(strippedPath).toBe('hello/world');
    });

    it('should return original string if right most char is not delimter', function() {
      var notUsedChar = '!';

      var strippedPath = f2._stripRight(STR, notUsedChar);

      expect(strippedPath).toBe('hello/world/');
    });

  });


  describe('_isScalar', function() {

    var scalars;

    beforeEach(function() {
      scalars = {
        "myNumber": 12,
        "myBoolean": true,
        "myString": 'hello',
        "myNull": null
      };
    });

    it('should return true when passed number', function() {
      expect(f2._isScalar(scalars.myNumber)).toBe(true);
    });

    it('should return true when passed boolean', function() {
      expect(f2._isScalar(scalars.myBoolean)).toBe(true);
    });

    it('should return true when passed string', function() {
      expect(f2._isScalar(scalars.myString)).toBe(true);
    });

    it('should return true when passed null', function() {
      expect(f2._isScalar(scalars.myNull)).toBe(true);
    });

  });


  describe('_isArray', function() {

    var scalars;

    beforeEach(function() {
      scalars = {
        "myNumber": 12,
        "myBoolean": true,
        "myString": 'hello',
        "myNull": null
      };
    });

    it('should return true when passed array', function() {
      var myArray = [];

      expect(f2._isArray(myArray)).toBe(true);
    });

    it('should return false when passed scalar or object', function() {
      expect(f2._isArray(scalars.myNumber)).toBe(false);
      expect(f2._isArray(scalars.myBoolean)).toBe(false);
      expect(f2._isArray(scalars.myString)).toBe(false);
      expect(f2._isArray(scalars.myNull)).toBe(false);
      expect(f2._isArray({})).toBe(false);
    });

  });


  describe('_isObject', function() {

    var scalars;

    beforeEach(function() {
      scalars = {
        "myNumber": 12,
        "myBoolean": true,
        "myString": 'hello',
        "myNull": null
      };
    });

    it('should return true when passed object', function() {
      var myObject = {};

      expect(f2._isObject(myObject)).toBe(true);
    });

    it('should return false when passed scalar or array', function() {
      expect(f2._isObject(scalars.myNumber)).toBe(false);
      expect(f2._isObject(scalars.myBoolean)).toBe(false);
      expect(f2._isObject(scalars.myString)).toBe(false);
      expect(f2._isObject(scalars.myNull)).toBe(false);
      expect(f2._isObject([])).toBe(false);
    });

  });


});

/**
 * 
 * isFlattened
 * return {boolean} - true if no object values are objects
 * 
 */

function isFlattened(data) {
  var isFlattened = true;

  for (var key in data) {
    var value = data[key];
    var valueType = typeof value;

    if (valueType === 'object' &&
      value !== null &&
      !(Array.isArray(value))) {
      isFlattened = false;
      break;
    }
  }

  return isFlattened;
}