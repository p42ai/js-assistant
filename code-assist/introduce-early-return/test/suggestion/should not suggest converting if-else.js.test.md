
## Input
```javascript input
function f() {
    if (a) {
        doSomething();
    } else {
        doSomethingElse();
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
  "14-96-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f() {
    if (a) {
        doSomething();
        return;
    }
    doSomethingElse();
}
```
