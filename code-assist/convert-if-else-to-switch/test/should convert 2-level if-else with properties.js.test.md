
## Input
```javascript input
if (x === C.CONST_1) {
    fa();
} else if (x === C.CONST_2) {
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
    case C.CONST_1:
        fa();
        break;
    case C.CONST_2:
        fb();
        break;
}
```
