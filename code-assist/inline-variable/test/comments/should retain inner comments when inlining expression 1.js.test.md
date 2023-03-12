
## Input
```javascript input
let a /* 1 */ = /* 2 */ f(/* 3 */ x /* 4 */, /* 5 */ y /* 6 */); // 7
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
console.log(f(/* 3 */ x /* 4 */, /* 5 */ y /* 6 */));
```
