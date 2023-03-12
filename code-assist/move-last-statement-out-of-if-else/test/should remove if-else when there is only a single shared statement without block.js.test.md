
## Input
```javascript input
const x = value;
if (x) f() else f();
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
  "16-37-IfStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove the redundant if-else statement and replace it with its content."
    }
  }
}
```

## Expected Output
```javascript expected output
const x = value;
f();
```
