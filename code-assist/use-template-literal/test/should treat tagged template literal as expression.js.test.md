
// also don't add parenthesis around regular expressions

## Input
```javascript input
let s = "hello" + tag`template${expression}`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let s = `hello${tag`template${expression}`}`;
```
