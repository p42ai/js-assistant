
## Input
```javascript input
const v1 = "123";
const a = {
  v1
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const v1 = "123";
const a = {
  v1: v1
};
```
