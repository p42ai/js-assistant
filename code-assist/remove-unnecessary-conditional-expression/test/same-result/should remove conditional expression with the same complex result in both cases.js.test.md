
## Input
```javascript input
const x = a ? b.q.p(12, 34) : b.q.p(12, 34);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const x = b.q.p(12, 34);
```
