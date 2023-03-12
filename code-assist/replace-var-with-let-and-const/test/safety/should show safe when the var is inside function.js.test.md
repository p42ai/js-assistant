
## Input
```javascript input
(function() {
    var notAGlobalInsideIFFE = "123";
})();
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
  "13-50-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
(function() {
    const notAGlobalInsideIFFE = "123";
})();
```
