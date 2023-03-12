
## Input
```javascript input
let a = 123;
a ??= x === y ? 1 : 2;
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
a = a ?? (x === y ? 1 : 2);
```
