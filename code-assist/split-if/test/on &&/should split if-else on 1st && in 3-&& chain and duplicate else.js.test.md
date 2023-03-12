
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
  "selection": "6-6",
  "transformationId": "split-and-into-nested-if-with-duplicate-else"
}
```

## Expected Output
```javascript expected output
if (a) {
    if (b && c && d) {
        console.log("1");
    } else {
        console.log("2");
    }
} else {
    console.log("2");
}
```
