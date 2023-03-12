
## Input
```javascript input
for (var a of [1, 2, 3]) {
    var usedWithinIteration;
    usedWithinIteration = true;
    usedWithinIteration = false;
    console.log(usedWithinIteration);
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
for (const a of [1, 2, 3]) {
    let usedWithinIteration;
    usedWithinIteration = true;
    usedWithinIteration = false;
    console.log(usedWithinIteration);
}
```
