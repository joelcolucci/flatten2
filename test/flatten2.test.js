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

      flattenedData = flatten2.flatten(data);
    });

    it('should concat nested object keys', function() {
      expect('patriots/coaches/head' in flattenedData).to.be.true;
      expect('patriots/coaches/oline' in flattenedData).to.be.true;
    });

    it('should maintain values for concatted nested keys', function() {
      expect(flattenedData['patriots/coaches/head']).to.equal('bill');
      expect(flattenedData['patriots/coaches/oline']).to.equal('scarnecchia');
    });

    it('should maintain scalar data types', function() {
      expect(flattenedData.myNumber).to.be.a('number');
      expect(flattenedData.myBoolean).to.be.a('boolean');
      expect(flattenedData.myString).to.be.a('string');
      expect(flattenedData.myNull).to.equal(null);
    });

    it('should maintain nested scalar data types', function() {
      expect(flattenedData['nestedTypes/myNumber']).to.be.a('number');
      expect(flattenedData['nestedTypes/myBoolean']).to.be.a('boolean');
      expect(flattenedData['nestedTypes/myString']).to.be.a('string');
      expect(flattenedData['nestedTypes/myNull']).to.equal(null);
    });

    it('should flatten all object values', function() {
      expect(isFlattened(flattenedData)).to.be.true;
      expect(isFlattened(data)).to.be.false;
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
      var flattenedData = flatten2.flattenMany(data);

      var isAllFlattened = true;

      for (var i = 0, n = flattenedData.length; i < n; i++) {
        var currentObject = flattenedData[i];
        if (!isFlattened(currentObject)) {
          isAllFlattened = false;
          break;
        }
      }

      expect(isAllFlattened).to.be.true;
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
      var keyPath = flatten2._createKeyPath(PATH, KEY, DELIMITER);

      expect(keyPath).to.equal('hello/world/');
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
      var strippedPath = flatten2._stripRight(STR, DELIMITER);

      expect(strippedPath).to.equal('hello/world');
    });

    it('should return original string if right most char is not delimter', function() {
      var notUsedChar = '!';

      var strippedPath = flatten2._stripRight(STR, notUsedChar);

      expect(strippedPath).to.equal('hello/world/');
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
      expect(flatten2._isScalar(scalars.myNumber)).to.be.true;
    });

    it('should return true when passed boolean', function() {
      expect(flatten2._isScalar(scalars.myBoolean)).to.be.true;
    });

    it('should return true when passed string', function() {
      expect(flatten2._isScalar(scalars.myString)).to.be.true;
    });

    it('should return true when passed null', function() {
      expect(flatten2._isScalar(scalars.myNull)).to.be.true;
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

      expect(flatten2._isArray(myArray)).to.be.true;
    });

    it('should return false when passed scalar or object', function() {
      expect(flatten2._isArray(scalars.myNumber)).to.be.false;
      expect(flatten2._isArray(scalars.myBoolean)).to.be.false;
      expect(flatten2._isArray(scalars.myString)).to.be.false;
      expect(flatten2._isArray(scalars.myNull)).to.be.false;
      expect(flatten2._isArray({})).to.be.false;
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

      expect(flatten2._isObject(myObject)).to.be.true;
    });

    it('should return false when passed scalar or array', function() {
      expect(flatten2._isObject(scalars.myNumber)).to.be.false;
      expect(flatten2._isObject(scalars.myBoolean)).to.be.false;
      expect(flatten2._isObject(scalars.myString)).to.be.false;
      expect(flatten2._isObject(scalars.myNull)).to.be.false;
      expect(flatten2._isObject([])).to.be.false;
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