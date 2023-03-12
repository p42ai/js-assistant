
## Input
```javascript input
function q() {
    if (x === 1) {
        var a = 3;
        return fa(a);
    } else if (x === 2) {
        return fb();
    }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "19-19"
}
```

## Expected Output
```javascript expected output
function q() {
    switch (x) {
        case 1:
            var a = 3;
            return fa(a);
        case 2:
            return fb();
    }
}
```
