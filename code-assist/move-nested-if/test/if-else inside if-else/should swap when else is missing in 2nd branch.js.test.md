
## Input
```javascript input
if (conditionA) {
    if (conditionB) {
        doSomething1();
    } else {
        doSomething2();
    }
} else {
    if (conditionB) {
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
    } else {
        doSomething3();
    }
} else {
    if (conditionA) {
        doSomething2();
    }
}
```
