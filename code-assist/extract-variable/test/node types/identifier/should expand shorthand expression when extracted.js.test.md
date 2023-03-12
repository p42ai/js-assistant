
## Input
```javascript input
const aProperty = "123";
const anObject = {
  aProperty
};
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "46-55"
}
```

## Expected Output
```javascript expected output
const aProperty = "123";
const aProperty2 = aProperty;
const anObject = {
  aProperty: aProperty2
};
```
