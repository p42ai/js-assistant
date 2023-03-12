
## Input
```javascript input
if (x()) {
  f1a();
  f2();
} else {
  f1b();
  f2();
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
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can move the duplicated last statement below the if-else statement."
    }
  }
}
```

## Expected Output
```javascript expected output
if (x()) {
  f1a();
} else {
  f1b();
}
f2();
```
