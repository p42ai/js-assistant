
## Input
```javascript input
a(function (
    b
) {
    return c;
});
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a((b) => c);
```
