
## Input
```javascript input
function f() {
    for (const x of y) {
        if (a) {
            f1();
        } else {
            f2();
        }
    }
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
