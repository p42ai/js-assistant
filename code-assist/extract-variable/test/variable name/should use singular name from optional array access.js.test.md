
## Input
```javascript input
f(elements?.[2]);
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
const element = elements?.[2];
f(element);
```
