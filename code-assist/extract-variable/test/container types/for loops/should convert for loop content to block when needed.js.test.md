
## Input
```javascript input
for (let i = 0; i < anArray.length; i++) anotherArray.push(anArray[i]);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "59-69"
}
```

## Expected Output
```javascript expected output
for (let i = 0; i < anArray.length; i++) {
  const newVariable = anArray[i];
  anotherArray.push(newVariable);
}
```
