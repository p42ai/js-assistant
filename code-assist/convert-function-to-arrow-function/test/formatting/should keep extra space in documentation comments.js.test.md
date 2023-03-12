
## Input
```javascript input
const f1 = function () {
  
  /**
   * documentation
   */
  const x;  
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
const f1 = () => {
  
  /**
   * documentation
   */
  const x;  
};
```
