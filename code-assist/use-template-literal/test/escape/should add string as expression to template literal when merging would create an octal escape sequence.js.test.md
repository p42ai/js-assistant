
## Input
```javascript input
let a;
let s = a + '\0' + '3';
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a;
let s = `${a}\0${'3'}`;
```
