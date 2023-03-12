
## Input
```javascript input
var object = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
};

for (var [keyTwo, valueTwo] of object.entries()) {
    keyTwo = 'something';
    console.log(keyTwo, valueTwo);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const object = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
};

for (let [keyTwo, valueTwo] of object.entries()) {
    keyTwo = 'something';
    console.log(keyTwo, valueTwo);
}
```
