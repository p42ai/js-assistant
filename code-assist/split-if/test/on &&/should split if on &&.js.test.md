
## Input
```javascript input
if (a && b) {
    console.log("1");
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
if (a) {
    if (b) {
        console.log("1");
    }
}
```
