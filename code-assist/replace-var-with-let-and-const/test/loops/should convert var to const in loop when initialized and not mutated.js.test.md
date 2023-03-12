
## Input
```javascript input
for (const a of [1, 2, 3]) {
    var initializedInLoop = true;
    console.log(initializedInLoop);
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
    const initializedInLoop = true;
    console.log(initializedInLoop);
}
```
