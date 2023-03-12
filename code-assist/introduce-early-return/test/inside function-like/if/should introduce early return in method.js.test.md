
## Input
```javascript input
class C {
    m() {
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
    m() {
        if (!a) {
            return;
        }
        doSomething();
    }
}
```
