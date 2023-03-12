
## Input
```javascript input
const f1 = function () {
    return f2(() => {
        return this.someMethod();
    });
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
