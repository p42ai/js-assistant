
## Input
```javascript input
a.b.x(1, 2) === "a" || a.b.x(1, 2) === "b";
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
["a", "b"].includes(a.b.x(1, 2));
```
