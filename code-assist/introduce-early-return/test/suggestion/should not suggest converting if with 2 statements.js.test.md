
## Input
```javascript input
function f() {
    if (a) {
        doSomething();
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
  "14-83-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
function f() {
    if (!a) {
        return;
    }
    doSomething();
    doSomethingElse();
}
```
