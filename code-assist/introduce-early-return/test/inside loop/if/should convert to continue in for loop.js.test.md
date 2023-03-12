
## Input
```javascript input
for (let i = 0; i < anArray.length; i++) {
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
for (let i = 0; i < anArray.length; i++) {
  if (!a) {
    continue;
  }
  doSomething();
}
```
