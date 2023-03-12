
## Input
```javascript input
let a = f.abc(1, 2) === null || f.abc(1, 2) === undefined;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = f.abc(1, 2) == null;
```
