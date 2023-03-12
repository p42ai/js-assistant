
## Input
```javascript input
/**
 * Function
 */
export default function() {
  const a, b;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
/**
 * Function
 */
export default function() {
  const a;
  const b;
}
```
