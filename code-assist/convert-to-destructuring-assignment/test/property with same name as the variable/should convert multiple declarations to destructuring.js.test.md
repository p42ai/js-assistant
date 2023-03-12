
## Input
```javascript input
const propertyA = anObject.propertyA,
      propertyB = anotherObject.propertyB;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { propertyA } = anObject,
      { propertyB } = anotherObject;
```
