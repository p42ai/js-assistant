
## Input
```javascript input
var a = "1";
switch (a) {
    case "1":
        var x = "2", y = "3";
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const a = "1";
switch (a) {
    case "1":
        const x = "2", y = "3";
}
```
