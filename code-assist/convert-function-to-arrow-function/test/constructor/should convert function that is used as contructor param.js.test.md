
## Input
```javascript input
new O(function () {
    return 1;
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
new O(() => 1);
```
