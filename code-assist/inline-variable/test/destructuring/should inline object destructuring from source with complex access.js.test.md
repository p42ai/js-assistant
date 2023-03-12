
## Input
```javascript input
const { aProperty } = a[b()];
const aVariable = aProperty;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const aVariable = a[b()].aProperty;
```
