
## Input
```javascript input
if (x.value === 'a' || x.value === 'b') {
    fa();
} else {
    fb();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-0"
}
```

## Expected Matches
```json expected matches
{
  "0-72-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "evaluates expression only once"
    }
  }
}
```

## Expected Output
```javascript expected output
switch (x.value) {
    case 'a':
    case 'b':
        fa();
        break;
    default:
        fb();
        break;
}
```
