
## Input
```javascript input
function globalF() {
    C.f({
        z: function s() {
        },

        x: function() {
            const a, b;

            log(a, b);
        }
    });
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
function globalF() {
    C.f({
        z: function s() {
        },

        x: () => {
            const a, b;

            log(a, b);
        }
    });
}
```
