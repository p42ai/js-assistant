
## Input
```javascript input
function* f() {
  yield a === null || a === undefined;
}

const q = a === null || a === undefined;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
function* f() {
  yield a == null;
}

const q = a == null;
```
