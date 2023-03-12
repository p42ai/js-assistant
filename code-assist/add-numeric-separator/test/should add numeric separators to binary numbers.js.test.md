
## Input
```javascript input
const literals = [
   0b0000,
   0b1111,
   0b11111,
   -0b11111,
   0b0011110000110011,
   0b0011110000110011101,
]
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const literals = [
   0b0000,
   0b1111,
   0b1_1111,
   -0b1_1111,
   0b0011_1100_0011_0011,
   0b001_1110_0001_1001_1101,
]
```
