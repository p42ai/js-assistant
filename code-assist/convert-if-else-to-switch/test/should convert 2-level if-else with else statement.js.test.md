
## Input
```javascript input
if (x === 'a') {
    fa();
} else if (x === 'b') {
    fb();
} else {
    fdefault();
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
    case 'a':
        fa();
        break;
    case 'b':
        fb();
        break;
    default:
        fdefault();
        break;
}
```
