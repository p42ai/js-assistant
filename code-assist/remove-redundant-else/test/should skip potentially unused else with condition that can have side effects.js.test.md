
## Input
```javascript input
if (f()) {
    console.log("1");
} else if (!f()) {
    console.log("2");
} else {
    console.log("3"); // can never be invoked
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
