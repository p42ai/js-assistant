
## Input
```javascript input
const property = "123";
for (const element of anObject.property) {
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "46-63"
}
```

## Expected Output
```javascript expected output
const property = "123";
const property2 = anObject.property;
for (const element of property2) {
}
```
