
## Input
```javascript input
if (x()) {
  f1();
  f2a();
} else {
  f1();
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
  "0-55-IfStatement": {
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
f1();
if (x()) {
  f2a();
} else {
  f2b();
}
```
