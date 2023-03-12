
## Input
```javascript input
f(new Example());
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "2-15"
}
```

## Expected Output
```javascript expected output
const example = new Example();
f(example);
```
