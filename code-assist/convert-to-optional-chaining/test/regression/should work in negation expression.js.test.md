
## Input
```javascript input
if (!(a && a.b)) {
  f();
}

const x = a && a.b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (!(a?.b)) {
  f();
}

const x = a?.b;
```
