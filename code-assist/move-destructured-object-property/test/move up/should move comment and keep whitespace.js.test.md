
## Input
```javascript input
const {
  propertyA,

  // comment
  propertyB
} = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "37-37",
  "transformationId": "up"
}
```

## Expected Output
```javascript expected output
const {
  // comment
  propertyB,

  propertyA
} = anObject;
```
