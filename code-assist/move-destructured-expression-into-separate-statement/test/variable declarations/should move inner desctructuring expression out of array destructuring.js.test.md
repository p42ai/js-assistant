
## Input
```javascript input
const [value1, [innerValue], value2] = anArray;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "15-15"
}
```

## Expected Output
```javascript expected output
const [value1, , value2] = anArray;
const [innerValue] = anArray[1];
```
