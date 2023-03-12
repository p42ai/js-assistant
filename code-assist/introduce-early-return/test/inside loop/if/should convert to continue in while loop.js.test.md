
## Input
```javascript input
while (condition()) {
  if (a) {
    doSomething();
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
while (condition()) {
  if (!a) {
    continue;
  }
  doSomething();
}
```
