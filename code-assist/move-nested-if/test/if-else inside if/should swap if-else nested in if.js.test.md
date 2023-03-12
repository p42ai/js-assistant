
## Input
```javascript input
if (conditionA) {
    if (conditionB) {
        doSomething1();
    } else {
        doSomething2();
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
        doSomething2();
    }
}
```
