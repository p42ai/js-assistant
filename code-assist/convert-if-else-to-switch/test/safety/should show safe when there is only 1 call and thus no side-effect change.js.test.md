
## Input
```javascript input
if (x.value === 'a') {
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
  "0-53-IfStatement": {
    "safety": {
      "level": "SAFE"
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
    default:
        fb();
        break;
}
```
