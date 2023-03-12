
## Input
```javascript input
for (const node of nodes) {
  if (condition(node)) {
    doSomething1();
    doSomething2();
    return true;
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
for (const node of nodes) {
  if (!condition(node)) {
    continue;
  }
  doSomething1();
  doSomething2();
  return true;
}
```
