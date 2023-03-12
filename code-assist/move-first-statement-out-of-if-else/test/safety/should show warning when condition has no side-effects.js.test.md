
## Input
```javascript input
const x = value;
if (x) {
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
  "16-70-IfStatement": {
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "could affect if-statement condition"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = value;
f1();
if (x) {
  f2a();
} else {
  f2b();
}
```
