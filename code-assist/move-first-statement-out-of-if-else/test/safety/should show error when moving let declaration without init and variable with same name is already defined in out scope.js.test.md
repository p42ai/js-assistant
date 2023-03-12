
## Input
```javascript input
const a = 23;
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
  "13-95-IfStatement": {
    "suggestion": null,
    "safety": {
      "level": "ERROR",
      "message": "variable name is already used in outer scope"
    }
  }
}
```

## Expected Output
```javascript expected output
const a = 23;
let a;
if (x) {
  a = "123";
  f2a();
} else {
  a = "345";
  f2b();
}
```
