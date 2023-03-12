
## Input
```javascript input
for (let k = 0; k < values.length; k++) {
  const value = values[k];
  console.log(value);
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
for (const value of values) {
  console.log(value);
}
```
