
## Input
```javascript input
if (a && b) {
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
  "transformationId": "split-and-into-nested-if"
}
```

## Expected Matches
```json expected matches
{
  "4-10-BinaryExpression": {
    "safety": {
      "level": "ERROR",
      "message": "changes when else statement is executed"
    }
  }
}
```

## Expected Output
```javascript expected output
if (a) {
    if (b) {
        console.log("1");
    }
} else {
    console.log("2");
}
```
