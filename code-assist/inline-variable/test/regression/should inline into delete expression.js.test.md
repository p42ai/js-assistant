
## Input
```javascript input
const self = this;
delete self.abc;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
delete this.abc;
```
