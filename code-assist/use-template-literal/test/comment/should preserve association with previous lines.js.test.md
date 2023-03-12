
## Input
```javascript input
const a = b
  ? // comment line 1
    // comment line 2
    // comment line 3
    "1" + b + "2"
  : "something else";
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = b
  ? // comment line 1
    // comment line 2
    // comment line 3
    `1${b}2`
  : "something else";
```
