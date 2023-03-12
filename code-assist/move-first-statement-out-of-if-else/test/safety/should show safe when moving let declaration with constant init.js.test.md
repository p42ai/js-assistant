
## Input
```javascript input
if (x) {
  let a = "123";
  f2a(a);
} else {
  let a = "123";
  f2b(a);
}
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
  "0-73-IfStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
let a = "123";
if (x) {
  f2a(a);
} else {
  f2b(a);
}
```
