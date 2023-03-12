
## Input
```javascript input
const a = "23";
const b = "ab";
g();
f(a, b);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-37"
}
```

## Expected Matches
```json expected matches
{
  "0-45-SourceFile": {
    "safety": {
      "level": "ERROR",
      "message": "2 declared variables are used after selected statements"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
if (true) {
  const a = "23";
  const b = "ab";
  g();
}
f(a, b);
```
