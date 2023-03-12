
## Input
```javascript input
function f() {
    if (a) {
        f1();
    } else {
        f2();
        f3();
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
  "14-88-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f() {
    if (a) {
        f1();
        return;
    }
    f2();
    f3();
}
```
