
## Input
```javascript input
switch(a) {
  case 1:
    console.log("1");
    console.log("2");
    console.log("3");
    console.log("4");
  case 2:
    console.log("5");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "48-87"
}
```

## Expected Output
```javascript expected output
switch(a) {
  case 1:
    console.log("1");
    try {
      console.log("2");
      console.log("3");
    } catch (error) {
      
    }
    console.log("4");
  case 2:
    console.log("5");
}
```
