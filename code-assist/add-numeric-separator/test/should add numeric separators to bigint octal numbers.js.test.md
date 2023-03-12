
## Input
```javascript input
const literals = [
   0o2n,
   0o22n,
   -0o22n,
   0o7171077777777777777777777n,
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
   0o2n,
   0o2_2n,
   -0o2_2n,
   0o7_1_7_1_0_7_7_7_7_7_7_7_7_7_7_7_7_7_7_7_7_7_7_7_7n,
]
```
