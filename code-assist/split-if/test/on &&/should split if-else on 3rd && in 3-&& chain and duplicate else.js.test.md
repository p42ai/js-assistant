
## Input
```javascript input
if (a && b && c && d) {
    console.log("1");
} else {
    console.log("2");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "16-16",
  "transformationId": "split-and-into-nested-if-with-duplicate-else"
}
```

## Expected Output
```javascript expected output
if (a && b && c) {
    if (d) {
        console.log("1");
    } else {
        console.log("2");
    }
} else {
    console.log("2");
}
```
