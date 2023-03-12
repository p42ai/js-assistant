
## Input
```javascript input
f(anObject.aProperty);
anObject.aProperty = "123";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-20"
}
```

## Expected Output
```javascript expected output
const aProperty = anObject.aProperty;
f(aProperty);
anObject.aProperty = "123";
```
