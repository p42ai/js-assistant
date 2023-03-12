
## Input
```javascript input
{
  {
    console.log("1");
    console.log("2");
    console.log("3");
    console.log("4");
    console.log("5");
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-94"
}
```

## Expected Output
```javascript expected output
{
  {
    console.log("1");
    try {
      console.log("2");
      console.log("3");
      console.log("4");
    } catch (error) {
      
    }
    console.log("5");
  }
}
```
