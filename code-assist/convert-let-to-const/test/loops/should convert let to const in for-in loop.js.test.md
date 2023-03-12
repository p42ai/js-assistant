
## Input
```javascript input
for (let a in something) {
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
for (const a in something) {
    console.log(a);
}
```