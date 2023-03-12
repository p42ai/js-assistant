
## Input
```javascript input
if (x()) {
  f1a();
  f2(`
    test
`);
} else {
  f1b();
  f2(`
    test
`);
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
if (x()) {
  f1a();
} else {
  f1b();
}
f2(`
    test
`);
```
