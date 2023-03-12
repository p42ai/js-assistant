
## Input
```javascript input
for (const value of anArray) anotherArray.push(value * value);
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
for (const value of anArray) {
  const newVariable = value * value;
  anotherArray.push(newVariable);
}
```
