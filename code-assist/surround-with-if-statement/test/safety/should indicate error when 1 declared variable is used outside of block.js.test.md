
## Input
```javascript input
const a = "23";
g();
f(a);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-21"
}
```

## Expected Matches
```json expected matches
{
  "0-26-SourceFile": {
    "safety": {
      "level": "ERROR",
      "message": "declared variable 'a' is used after selected statements"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
if (true) {
  const a = "23";
  g();
}
f(a);
```
