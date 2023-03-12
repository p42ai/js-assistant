
## Input
```javascript input
export const { aProperty1, aProperty2 } = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "27-27"
}
```

## Expected Output
```javascript expected output
export const { aProperty1, } = anObject;
export const aProperty2 = anObject.aProperty2;
```
