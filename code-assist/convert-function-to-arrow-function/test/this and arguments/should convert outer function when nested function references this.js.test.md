
## Input
```javascript input
const f = function () {
    return function () { return this.x; }
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const f = () => function () { return this.x; };
```
