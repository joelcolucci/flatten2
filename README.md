# flatten2 [![Build Status](https://travis-ci.org/joelcolucci/flatten2.svg?branch=master)](https://travis-ci.org/joelcolucci/flatten2)[![Test Coverage](https://codeclimate.com/github/joelcolucci/flatten2/badges/coverage.svg)](https://codeclimate.com/github/joelcolucci/flatten2/coverage)
Recursively flatten JavaScript objects.

#### Example flattening
Coming soon..

#### Credit to..
This is an adaption/refactoring of the flattening algorithm found in https://github.com/konklone/json.

## Installation
Install with NPM..
```
npm install --save flatten2
```

Install with bower..
```
bower install --save flatten2
```

## Getting started
#### Flatten a single object
```javascript
var myObject = {...}

var myFlattenedObject = flatten2.flatten(myObject);
```

#### Flatten each object within an Array
```javascript
var myArrayOfObjects = [
    {...},
    {...},
    {...}
];

var myArrayOfFlattenedObjects = flatten2.flattenMany(myArrayOfObjects);
```

## License
MIT License Copyright (c) 2016 Joel Colucci