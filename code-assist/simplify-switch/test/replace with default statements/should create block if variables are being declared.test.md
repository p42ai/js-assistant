
## Input
```javascript input
switch (condition) {
  default:
    const a = 12;
    doSomething(a);
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
{
  const a = 12;
  doSomething(a);
}
```
