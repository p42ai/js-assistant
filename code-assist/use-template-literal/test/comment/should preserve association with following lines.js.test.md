
## Input
```javascript input
const a = b
  ? "1" + b + "2"
  : // comment line 1
    // comment line 2
    // comment line 3
    "something else";
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
  ? `1${b}2`
  : // comment line 1
    // comment line 2
    // comment line 3
    "something else";
```
