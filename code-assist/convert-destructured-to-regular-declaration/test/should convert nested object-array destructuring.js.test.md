
## Input
```javascript input
const { 
    aProperty1, 
    aProperty2: [value1, value2]
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
const aProperty1 = anObject.aProperty1, 
value1 = anObject.aProperty2[0], 
value2 = anObject.aProperty2[1];
```
