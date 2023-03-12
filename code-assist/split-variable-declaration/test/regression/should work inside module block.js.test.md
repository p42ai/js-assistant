
## Input
```javascript input
namespace ns {
  const a, b;
  const x, y;
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
namespace ns {
  const a;
  const b;
  const x;
  const y;
}
```
