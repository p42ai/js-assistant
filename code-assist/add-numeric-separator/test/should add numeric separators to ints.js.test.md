
## Input
```javascript input
const literals = [
   1,
   999,
   1000, // want to have 2 leading chars
   1001, // want to have 2 leading chars
   9999, // want to have 2 leading chars
   10000,
   100000,
   1000000000000,
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
   1,
   999,
   1000, // want to have 2 leading chars
   1001, // want to have 2 leading chars
   9999, // want to have 2 leading chars
   10_000,
   100_000,
   1_000_000_000_000,
]
```
