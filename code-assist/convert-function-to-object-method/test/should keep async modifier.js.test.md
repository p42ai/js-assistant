
## Input
```javascript input
const a = {
  f: async function() {
    return "x";
  }
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
const a = {
  async f() {
    return "x";
  }
};
```
