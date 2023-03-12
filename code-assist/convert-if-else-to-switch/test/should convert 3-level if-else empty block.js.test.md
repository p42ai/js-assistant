
## Input
```javascript input
if (x === 'a') {
    fa();
} else if (x === 'b') {
} else if (x === 'c') {
    fc();
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
        break;
    case 'c':
        fc();
        break;
}
```
