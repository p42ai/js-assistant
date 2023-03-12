
## Input
```javascript input
with (something) someValue = a * a;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "29-34"
}
```

## Expected Output
```javascript expected output
with (something) {
  const newVariable = a * a;
  someValue = newVariable;
}
```
