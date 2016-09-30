describe('flatten', function() {


    describe('flattenObject', function() {
    
        var data,
        flattenedData;

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

            flattenedData = flattenObject(data);
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
            data = [
                {
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
            var flattenedData = flattenMany(data);

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


    describe('isScalar', function() {

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
            expect(isScalar(scalars.myNumber)).toBe(true);
        });

        it('should return true when passed boolean', function() {
            expect(isScalar(scalars.myBoolean)).toBe(true);
        });

        it('should return true when passed string', function() {
            expect(isScalar(scalars.myString)).toBe(true);
        });

        it('should return true when passed null', function() {
            expect(isScalar(scalars.myNull)).toBe(true);
        });
    
    });


    describe('isArray', function() {

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

            expect(isArray(myArray)).toBe(true);
        });

        it('should return false when passed scalar or object', function() {
            expect(isArray(scalars.myNumber)).toBe(false);
            expect(isArray(scalars.myBoolean)).toBe(false);
            expect(isArray(scalars.myString)).toBe(false);
            expect(isArray(scalars.myNull)).toBe(false);
            expect(isArray({})).toBe(false);
        });

    });


    describe('isObject', function() {

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

            expect(isObject(myObject)).toBe(true);
        });

        it('should return false when passed scalar or array', function() {
            expect(isObject(scalars.myNumber)).toBe(false);
            expect(isObject(scalars.myBoolean)).toBe(false);
            expect(isObject(scalars.myString)).toBe(false);
            expect(isObject(scalars.myNull)).toBe(false);
            expect(isObject([])).toBe(false);
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