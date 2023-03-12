
## Input
```javascript input
if (x === 1) {
    let a = 3;
    fa(a);
} else if (x === 2) {
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
        {
            let a = 3;
            fa(a);
        }
        break;
    case 2:
        fb();
        break;
}
```
