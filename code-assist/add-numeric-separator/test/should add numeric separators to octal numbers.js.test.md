
## Input
```javascript input
const literals = [
   0123123, // ignored
   0777777, // ignored
   0o2,
   0o22,
   -0o22,
   0o71710,
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
   0123123, // ignored
   0777777, // ignored
   0o2,
   0o2_2,
   -0o2_2,
   0o7_1_7_1_0,
]
```
