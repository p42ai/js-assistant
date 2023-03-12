
## Input
```javascript input
const {
  propertyA,
  ...otherValues
} = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "23-23",
  "transformationId": "up"
}
```

## Expected Output
```javascript expected output
const {
  ...otherValues,
  propertyA
} = anObject;
```
