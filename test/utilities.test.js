import { stripRight, createKeyPath } from '../lib/utilities';

describe('createKeyPath', () => {
  let PATH;
  let KEY;
  let DELIMITER;

  beforeEach(() => {
    PATH = 'hello/';
    KEY = 'world';
    DELIMITER = '/';
  });

  test('should concat args', () => {
    let keyPath = createKeyPath(PATH, KEY, DELIMITER);

    expect(keyPath).toBe('hello/world/');
  });
});

describe('stripRight', () => {
  let DELIMITER;
  let STR;

  beforeEach(() => {
    DELIMITER = '/';
    STR = 'hello/world/';
  });

  test('should remove right most char if delimiter', () => {
    let strippedPath = stripRight(STR, DELIMITER);

    expect(strippedPath).toBe('hello/world');
  });

  test('should return original string if right most char is not delimter', () => {
    let notUsedChar = '!';

    let strippedPath = stripRight(STR, notUsedChar);

    expect(strippedPath).toBe('hello/world/');
  });
});
