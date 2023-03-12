
## Input
```javascript input
let x = "3";
x = abcd;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "17-21"
}
```

## Expected Output
```javascript expected output
let x = "3";
const abcd2 = abcd;
x = abcd2;
```
