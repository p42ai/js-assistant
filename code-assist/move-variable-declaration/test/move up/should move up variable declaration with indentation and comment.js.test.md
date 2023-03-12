
## Input
```javascript input
const a = 1,

  // comment
  b = 2,
  c = 3;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "29-29",
  "transformationId": "up"
}
```

## Expected Output
```javascript expected output
const // comment
  b = 2,

  a = 1,
  c = 3;
```

