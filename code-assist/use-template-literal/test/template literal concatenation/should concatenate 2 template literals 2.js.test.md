
## Input
```javascript input
let b;
let s = `a${b}` + `${b}e`;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "14-32-BinaryExpression": {
    "suggestion": {
      "description": "You can merge a concatenation expression into a single template literal."
    }
  }
}
```

## Expected Output
```javascript expected output
let b;
let s = `a${b}${b}e`;
```
