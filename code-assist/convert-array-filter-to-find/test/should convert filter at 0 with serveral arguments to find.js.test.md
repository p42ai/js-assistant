
## Input
```javascript input
anArray.filter((element, index, array) => true, thisArg)[0];
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
anArray.find((element, index, array) => true, thisArg);
```
