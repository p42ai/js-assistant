
## Input
```javascript input
function f() {
    if (a) {
        console.log("a");
        return f1();
    } else if (b) {
        console.log("b");
        console.log("c");
        return f2();
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
  "14-173-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f() {
    if (a) {
        console.log("a");
        return f1();
    }
    if (b) {
        console.log("b");
        console.log("c");
        return f2();
    }
}
```
