
## Input
```javascript input
if (x === 1 || x === 2) {
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

## Expected Output
```javascript expected output
switch (x) {
    case 1:
    case 2:
        fa();
        break;
    default:
        fb();
        break;
}
```
