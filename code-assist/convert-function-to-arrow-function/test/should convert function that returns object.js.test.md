
## Input
```javascript input
const f = function () {
  return {
    a: 1,
  };
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
const f = () => ({
  a: 1,
});
```
