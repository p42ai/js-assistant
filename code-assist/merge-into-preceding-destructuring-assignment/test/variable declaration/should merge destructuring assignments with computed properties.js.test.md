
## Input
```javascript input
const { [key1]: a } = obj;
const { [key2]: b } = obj;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { [key1]: a, [key2]: b } = obj;
```
