
## Input
```javascript input
switch (x) {
  case "a":
    let a;
    a = 123;
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
switch (x) {
  case "a":
    let a = 123;
}
```
