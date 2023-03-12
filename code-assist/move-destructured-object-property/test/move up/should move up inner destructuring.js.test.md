
## Input
```javascript input
const {
  propertyA,
  propertyB: {
    propertyC
  }
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
  propertyB: {
    propertyC
  },
  propertyA
} = anObject;
```
