
## Input
```javascript input
let a /* 1 */ = 1 /* 2 */ + /* 3 */ 2; // 4
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
console.log(1 /* 2 */ + /* 3 */ 2);
```
