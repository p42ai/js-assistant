
## Input
```javascript input
a = function(b) {
    x();
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
a = (b) => {
    x();
};
```
