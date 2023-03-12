
## Input
```javascript input
for (let i = 0; i < anArray.length; i++) {
    if (a) doSomething(); else doSomethingElse();
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
    if (a) {
        doSomething();
        continue;
    }
    doSomethingElse();
}
```
