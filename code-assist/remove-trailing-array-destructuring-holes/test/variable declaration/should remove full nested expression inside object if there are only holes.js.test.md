
## Input
```javascript input
const {
  a,
  b: [,,],
  c
} = anObject;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const {
  a,
  c
} = anObject;
```
