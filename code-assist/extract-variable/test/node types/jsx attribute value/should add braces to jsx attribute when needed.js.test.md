
## Input
```javascript input
<Element attribute="value" />
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "19-26"
}
```

## Expected Output
```javascript expected output
const newVariable = "value";
<Element attribute={newVariable} />
```
