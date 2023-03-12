
## Input
```javascript input
for (const a in elements) {
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
for (const a in elements) {
  if (!a) {
    continue;
  }
  doSomething();
}
```
