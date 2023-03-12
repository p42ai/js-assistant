
## Input
```javascript input
var object = {
  'a': 1,
  'b': 2,
  'c': 3,
  'd': 4,
};

for (var [key, value] of object.entries()) {
  console.log(key, value);
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

for (const [key, value] of object.entries()) {
  console.log(key, value);
}
```
