
## Input
```javascript input
do {
  if (a) {
    doSomething();
  }
} while (condition());
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
do {
  if (!a) {
    continue;
  }
  doSomething();
} while (condition());
```
