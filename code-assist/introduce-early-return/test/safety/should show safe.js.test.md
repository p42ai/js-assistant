
## Input
```javascript input
function f() {
    if (a) {
        doSomething();
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
  "14-56-IfStatement": {
    "safety": {
      "level": "SAFE"
    }
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
}
```
