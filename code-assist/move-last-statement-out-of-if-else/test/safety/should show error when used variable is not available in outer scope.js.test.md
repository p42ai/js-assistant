
## Input
```javascript input
if (x()) {
  const a = "1";
  f(a);
} else {
  const a = "2";
  f(a);
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
  "0-71-IfStatement": {
    "suggestion": null,
    "safety": {
      "level": "ERROR",
      "message": "used variable not available in outer scope"
    }
  }
}
```

## Expected Output
```javascript expected output
if (x()) {
  const a = "1";
} else {
  const a = "2";
}
f(a);
```
