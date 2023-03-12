
## Input
```javascript input
/* comment */ var a = {};
console.log(a);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
/* comment */ const a = {};
console.log(a);
```
