
## Input
```javascript input
for (let a of [1, 2, 3]) {
    console.log(a);
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
    console.log(a);
}
```