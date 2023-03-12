
## Input
```javascript input
function f() {
    if (a)
        return f1();
    else
        return f2();
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
  "14-76-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f() {
    if (a)
        return f1();
    return f2();
}
```
