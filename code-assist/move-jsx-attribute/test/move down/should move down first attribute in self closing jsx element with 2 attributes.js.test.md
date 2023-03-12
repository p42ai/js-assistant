
## Input
```javascript input
<Element attribute1={1} attribute2={2} />
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "9-9"
}
```

## Expected Output
```javascript expected output
<Element attribute2={2} attribute1={1} />
```
