
## Input
```javascript input
if (x.value === 'a') {
    fa();
} else if (x.value === 'b') {
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
  "0-74-IfStatement": {
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
        fa();
        break;
    case 'b':
        fb();
        break;
}
```
