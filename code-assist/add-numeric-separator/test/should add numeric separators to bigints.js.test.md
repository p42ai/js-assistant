
## Input
```javascript input
const literals = [
   1n,
   999n,
   1000n, // want to have 2 leading chars
   -1000n, // want to have 2 leading chars
   1001n, // want to have 2 leading chars
   9999n, // want to have 2 leading chars
   10000n,
   100000n,
   1000000000000n,
   1000000000000000000n,
]
```

## Configuration
```json configuration
{
  "extension": "js",
  "onlySuggestions": true
}
```

## Expected Output
```javascript expected output
const literals = [
   1n,
   999n,
   1000n, // want to have 2 leading chars
   -1000n, // want to have 2 leading chars
   1001n, // want to have 2 leading chars
   9999n, // want to have 2 leading chars
   10_000n,
   100_000n,
   1_000_000_000_000n,
   1_000_000_000_000_000_000n,
]
```
