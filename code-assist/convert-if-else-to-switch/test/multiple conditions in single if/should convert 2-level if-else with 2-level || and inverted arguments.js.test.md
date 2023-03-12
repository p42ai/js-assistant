
## Input
```javascript input
if (x === 1) {
    fa();
} else if (2 === x || 3 === x) {
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
        fa();
        break;
    case 2:
    case 3:
        fb();
        break;
}
```
