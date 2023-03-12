
## Input
```javascript input
const f1 = function () {
    this.f2(function () {
        return a + this.b;
    });
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
