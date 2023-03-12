
## Input
```javascript input
let a = 123;
a >>>= 4;
a = 4 >>> a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = 123;
a = a >>> 4;
a = 4 >>> a;
```
