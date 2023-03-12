
## Input
```javascript input
const x = value;
if (x == 1) {
    fa();
} else if (x === 2) {
    fb();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "17-17"
}
```

## Expected Matches
```json expected matches
{
  "16-74-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "changes == to strict equality"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = value;
switch (x) {
    case 1:
        fa();
        break;
    case 2:
        fb();
        break;
}
```
