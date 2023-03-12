
## Input
```javascript input
if (x) {
  let a;
  a = "123";
  f2a();
} else {
  let a;
  a = "345";
  f2b();
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
  "0-81-IfStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
let a;
if (x) {
  a = "123";
  f2a();
} else {
  a = "345";
  f2b();
}
```
