
## Input
```javascript input
if (conditionA) {
    if (conditionB) {
        doSomething1();
    }
} else {
    if (conditionB) {
        doSomething3();
    } else {
        doSomething4();
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
    } else {
        doSomething4();
    }
}
```
