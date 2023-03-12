
## Input
```javascript input
for (const value in anArray) anotherArray.push(value * value);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "47-60"
}
```

## Expected Output
```javascript expected output
for (const value in anArray) {
  const newVariable = value * value;
  anotherArray.push(newVariable);
}
```
