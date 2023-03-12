
## Input
```javascript input
try {
    f();
} catch (error) {
    const { message, stack } = error;
    report(message, stack);
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
try {
    f();
} catch ({ message, stack }) {
    report(message, stack);
}
```
