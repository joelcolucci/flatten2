import { flatten, flattenMany } from '../lib/index';
import toBeType from 'jest-tobetype';

expect.extend(toBeType);

describe('flatten', () => {
  let data;
  let flattenedData;

  beforeEach(() => {
    data = {
      patriots: {
        coaches: {
          head: 'bill',
          oline: 'scarnecchia'
        }
      },
      myNumber: 12,
      myBoolean: true,
      myString: 'hello',
      myNull: null,
      nestedTypes: {
        myNumber: 12,
        myBoolean: true,
        myString: 'hello',
        myNull: null
      }
    };

    flattenedData = flatten(data);
  });

  test('should concat nested object keys', () => {
    expect('patriots/coaches/head' in flattenedData).toBeTruthy();
    expect('patriots/coaches/oline' in flattenedData).toBeTruthy();
  });

  test('should maintain values for concatted nested keys', () => {
    expect(flattenedData['patriots/coaches/head']).toBe('bill');
    expect(flattenedData['patriots/coaches/oline']).toBe('scarnecchia');
  });

  test('should maintain scalar data types', () => {
    expect(flattenedData.myNumber).toBeType('number');
    expect(flattenedData.myBoolean).toBeType('boolean');
    expect(flattenedData.myString).toBeType('string');
    expect(flattenedData.myNull).toBe(null);
  });

  test('should maintain nested scalar data types', () => {
    expect(flattenedData['nestedTypes/myNumber']).toBeType('number');
    expect(flattenedData['nestedTypes/myBoolean']).toBeType('boolean');
    expect(flattenedData['nestedTypes/myString']).toBeType('string');
    expect(flattenedData['nestedTypes/myNull']).toBe(null);
  });

  test('should flatten all object values', () => {
    expect(isFlattened(flattenedData)).toBe(true);
    expect(isFlattened(data)).toBe(false);
  });
});

describe('flattenMany', () => {
  let data;

  beforeEach(() => {
    data = [{
        title: 'Creativity Inc',
        author: 'Ed Catmull',
        meta: {
          keywords: 'business,leadership',
          genre: 'business'
        }
      },
      {
        title: 'Ego is the Enemy',
        author: 'Ryan Holiday',
        meta: {
          keywords: 'philosophy',
          genre: 'philosophy'
        }
      }
    ];
  });

  test('flatten all objects in an array', () => {
    let flattenedData = flattenMany(data);

    let isAllFlattened = true;

    for (let i = 0, n = flattenedData.length; i < n; i++) {
      let currentObject = flattenedData[i];
      if (!isFlattened(currentObject)) {
        isAllFlattened = false;
        break;
      }
    }

    expect(isAllFlattened).toBe(true);
  });
});

function isFlattened(data) {
  let isFlattened = true;

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];
      let valueType = typeof value;

      if (valueType === 'object' &&
        value !== null &&
        !(Array.isArray(value))) {
        isFlattened = false;
        break;
      }
    }
  }

  return isFlattened;
}
