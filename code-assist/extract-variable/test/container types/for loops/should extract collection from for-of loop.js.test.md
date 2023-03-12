
## Input
```javascript input
for (const element of anObject.property) {
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "22-39"
}
```

## Expected Output
```javascript expected output
const property = anObject.property;
for (const element of property) {
}
```
