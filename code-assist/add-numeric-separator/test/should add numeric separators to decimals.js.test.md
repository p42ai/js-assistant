
## Input
```javascript input
const literals = [
   1.25,
   999.123,
   1000.1001001, // want to have 2 leading chars
   1001.1, // want to have 2 leading chars
   -1001.1, // want to have 2 leading chars
   9999.00, // want to have 2 leading chars
   10000.25,
   100000.123123123,
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
   1.25,
   999.123,
   1000.1001001, // want to have 2 leading chars
   1001.1, // want to have 2 leading chars
   -1001.1, // want to have 2 leading chars
   9999.00, // want to have 2 leading chars
   10_000.25,
   100_000.123123123,
]
```
