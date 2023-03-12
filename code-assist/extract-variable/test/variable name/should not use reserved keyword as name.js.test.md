
## Input
```javascript input
f(something.getThis());
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-21"
}
```

## Expected Output
```javascript expected output
const this2 = something.getThis();
f(this2);
```
