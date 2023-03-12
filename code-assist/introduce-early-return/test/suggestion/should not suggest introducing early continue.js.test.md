
## Input
```javascript input
for (let i = 0; i < anArray.length; i++) {
  if (a) {
    doSomething1();
    doSomething2();
    doSomething3();
  }
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "42-117-IfStatement": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
for (let i = 0; i < anArray.length; i++) {
  if (!a) {
    continue;
  }
  doSomething1();
  doSomething2();
  doSomething3();
}
```
