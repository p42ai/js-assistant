
Return statements in constructors are not a common pattern.

## Input
```javascript input
class C {
    constructor() {
        if (a) {
            doSomething();
            doSomethingElse();
            doSomethingElse2();
        }
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
  "29-146-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
class C {
    constructor() {
        if (!a) {
            return;
        }
        doSomething();
        doSomethingElse();
        doSomethingElse2();
    }
}
```
