
## Input
```javascript input
const a = {
    m: function() {
        console.log("test");
    }
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "18-66-FunctionExpression": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const a = {
    m: () => {
        console.log("test");
    }
}
```
