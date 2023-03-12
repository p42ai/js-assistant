
## Input
```javascript input
const [, b, c] = [1, 2, 3];
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "7-7",
  "transformationId": "down"
}
```

## Expected Output
```javascript expected output
const [b, , c] = [1, 2, 3];
```
