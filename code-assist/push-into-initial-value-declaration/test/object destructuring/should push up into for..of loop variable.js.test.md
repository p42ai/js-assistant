
## Input
```javascript input
for (const element of elements) {
  const { property1, property2 } = element;
  f(property1, property2);
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
for (const { property1, property2 } of elements) {
  f(property1, property2);
}
```
