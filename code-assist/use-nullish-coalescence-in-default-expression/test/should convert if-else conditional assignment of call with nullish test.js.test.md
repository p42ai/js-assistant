
## Input
```javascript input
let a;
if (f() != null) {
  a = f();
} else {
  a = 123;
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
  "6-58-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "could change number of function or getter calls"
    }
  }
}
```

## Expected Output
```javascript expected output
let a;
a = f() ?? 123;
```
