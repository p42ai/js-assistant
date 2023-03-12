
## Input
```javascript input
const a = 1, b = 2, noSideEffects = true;
if (noSideEffects) {
  let inner = a + b;
  f2a(inner);
} else {
  let inner = a + b;  
  f2b(inner);
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
  "41-145-IfStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can move the duplicated first statement above the if-else statement.",
      "highlightRanges": ["65-83", "109-127"]
    }
  }
}
```

## Expected Output
```javascript expected output
const a = 1, b = 2, noSideEffects = true;
let inner = a + b;
if (noSideEffects) {
  f2a(inner);
} else {
  f2b(inner);
}
```
