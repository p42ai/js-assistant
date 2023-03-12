
## Input
```javascript input
if (conditionA) {
    if (conditionB) {
        doSomething1();
    } else if (conditionC) {
        doSomething2();
    } else if (conditionD) {
        doSomething3();
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
if (conditionB) {
    if (conditionA) {
        doSomething1();
    }
} else {
    if (conditionA) {
        if (conditionC) {
            doSomething2();
        } else if (conditionD) {
            doSomething3();
        }
    }
}
```
