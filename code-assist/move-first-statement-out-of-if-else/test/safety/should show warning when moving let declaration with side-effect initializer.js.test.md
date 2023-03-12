
## Input
```javascript input
if (x) {
  let a = f12();
  f2a(a);
} else {
  let a = f12();
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
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "could affect if-statement condition; if-condition can have side-effects"
    }
  }
}
```

## Expected Output
```javascript expected output
let a = f12();
if (x) {
  f2a(a);
} else {
  f2b(a);
}
```
