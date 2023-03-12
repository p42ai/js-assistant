
## Input
```javascript input
f(something.get("key"));
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-22"
}
```

## Expected Output
```javascript expected output
const newVariable = something.get("key");
f(newVariable);
```
