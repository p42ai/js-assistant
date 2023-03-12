
## Input
```javascript input
label: switch (condition) {
  default: {
    doSomething();
    break label;
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
doSomething();
```
