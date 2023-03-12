
## Input
```javascript input
const a = {
  f: function(): string {
    return "x";
  }
};
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const a = {
  f(): string {
    return "x";
  }
};
```
