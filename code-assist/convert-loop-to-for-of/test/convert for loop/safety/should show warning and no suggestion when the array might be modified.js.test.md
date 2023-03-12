
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  elements.splice(0, 1);
  const element = elements[i];
  console.log(element);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "0-125-ForStatement": {
    "safety": {
      "level": "WARNING",
      "message": "'elements' might be modified inside loop"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
for (const element of elements) {
  elements.splice(0, 1);
  console.log(element);
}
```
