
## Input
```javascript input
const literals = [
   0b0000n,
   0b1111n,
   0b11111n,
   -0b11111n,
   0b0011110000110011n,
   0b0011110000110011101n,
   0b001111000011001110100111100001100111010011110000110011101n,
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
   0b0000n,
   0b1111n,
   0b1_1111n,
   -0b1_1111n,
   0b0011_1100_0011_0011n,
   0b001_1110_0001_1001_1101n,
   0b0_0111_1000_0110_0111_0100_1111_0000_1100_1110_1001_1110_0001_1001_1101n,
]
```
