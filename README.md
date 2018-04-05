# flatten2
> Recursively flatten JavaScript objects.

Zero dependencies.

## Installation
```
# NPM
npm install flatten2 --save

# Yarn
yarn add flatten2
```

## Example Input/Output
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
import { flatten } from 'flatten2';

var myObject = {...}

var myFlattenedObject = flatten(myObject);
```

### Flatten each object within an Array
```javascript
import { flattenMany } from 'flatten2';

var myArrayOfObjects = [
    {...},
    {...},
    {...}
];

var myArrayOfFlattenedObjects = flattenMany(myArrayOfObjects);
```

## API Reference
Coming soon..

## Contributing
Coming soon..

## License
MIT License Copyright (c) 2018 Joel Colucci