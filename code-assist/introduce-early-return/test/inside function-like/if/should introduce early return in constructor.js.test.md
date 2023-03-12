
## Input
```javascript input
class C {
    constructor() {
        if (a) {
            doSomething();
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

## Expected Output
```javascript expected output
class C {
    constructor() {
        if (!a) {
            return;
        }
        doSomething();
    }
}
```
