
## Input
```javascript input
const aProperty = "123";
const anObject = {
  aProperty
};
const somewhereElse = aProperty + "123";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "81-90"
}
```

## Expected Output
```javascript expected output
const aProperty = "123";
const aProperty2 = aProperty;
const anObject = {
  aProperty: aProperty2
};
const somewhereElse = aProperty2 + "123";
```
