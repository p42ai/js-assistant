
## Input
```javascript input
if (a && b) {
    console.log("1");
} else if (a && !b) {
    console.log("2");
} else {
    console.log("3");
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "0-0"
}
```

## Expected Matches
```json expected matches
{
  "0-112-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "invocation of getter or function calls in condition can change"
    }
  }
}
```

## Expected Output
```javascript expected output
if (a) {
    if (b) {
        console.log("1");
    } else {
        console.log("2");
    }
} else {
    console.log("3");
}
```
