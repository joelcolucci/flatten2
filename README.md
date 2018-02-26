# flatten2
> Recursively flatten JavaScript objects.

An adaption/refactoring of the flattening algorithm found in https://github.com/konklone/json.

## Installation
```
# NPM
npm install flatten2 --save

# Yarn
yarn add flatten2
```

## Example Output
Input
```javascript
{
    "team": {
        "name": "patriots",
        "coach": "bill belichick",
        "players": {
            "quarterback": "tom brady"
        }
    }
}
```

Output
```javascript
{
    "team/name": "patriots",
    "team/coach": "bill belichick",
    "team/players/quarterback": "tom brady"
}
```

## Getting started
### Flatten a single object
```javascript
var myObject = {...}

var myFlattenedObject = flatten2.flatten(myObject);
```

### Flatten each object within an Array
```javascript
var myArrayOfObjects = [
    {...},
    {...},
    {...}
];

var myArrayOfFlattenedObjects = flatten2.flattenMany(myArrayOfObjects);
```

## API Reference
Coming soon..

## Contributing
Coming soon..

## License
MIT License Copyright (c) 2016 Joel Colucci