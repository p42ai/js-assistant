
## Input
```javascript input
const a = {
  f() {
    const x = this;
    return x;
  }
}
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
  f() {
    return this;
  }
}
```
