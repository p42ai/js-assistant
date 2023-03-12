
## Input
```javascript input
var array = ['a', 'b', 'c', 'd'];
for (var letter in array) {
    console.log(letter);
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
const array = ['a', 'b', 'c', 'd'];
for (const letter in array) {
    console.log(letter);
}
```
