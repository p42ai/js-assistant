
## Input
```javascript input
let { aProperty1, aProperty2 } = anObject;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "18-18"
}
```

## Expected Output
```javascript expected output
let { aProperty1, } = anObject;
let aProperty2 = anObject.aProperty2;
```
