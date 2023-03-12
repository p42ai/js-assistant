
## Input
```javascript input
function f() {
    f1();
    f2();
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

## Expected Output
```javascript expected output
function f() {
    f1();
    f2();
    if (!a) {
        return;
    }
    doSomething();
}
```
