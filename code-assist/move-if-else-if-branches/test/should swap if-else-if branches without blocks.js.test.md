
## Input
```javascript input
if (conditionA) doSomethingA(); else if (conditionB) doSomethingB();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "4-4"
}
```

## Expected Output
```javascript expected output
if (conditionB) doSomethingB(); else if (conditionA) doSomethingA();
```
