
## Input
```javascript input
const x = { ...a && a.b };

const y = a && a.b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const x = { ...a?.b };

const y = a?.b;
```
