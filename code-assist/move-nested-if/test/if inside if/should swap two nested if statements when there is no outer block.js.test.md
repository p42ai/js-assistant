
## Input
```javascript input
if (conditionA)
    if (conditionB) {
        doSomething();
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
if (conditionB)
    if (conditionA) {
        doSomething();
    }
```
