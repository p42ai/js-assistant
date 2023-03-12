
## Input
```javascript input
{
    console.log("1");
    console.log("2");
    console.log("3");
    console.log("4");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "24-68"
}
```

## Expected Output
```javascript expected output
{
    console.log("1");
    try {
        console.log("2");
        console.log("3");
    } catch (error) {
        
    }
    console.log("4");
}
```
