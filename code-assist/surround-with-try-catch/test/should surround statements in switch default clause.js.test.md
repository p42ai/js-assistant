
## Input
```javascript input
switch(a) {
  case 1:
    console.log("1");
  default:
    console.log("2");
    console.log("3");
    console.log("4");
    console.log("5");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "81-120"
}
```

## Expected Output
```javascript expected output
switch(a) {
  case 1:
    console.log("1");
  default:
    console.log("2");
    try {
      console.log("3");
      console.log("4");
    } catch (error) {
      
    }
    console.log("5");
}
```
