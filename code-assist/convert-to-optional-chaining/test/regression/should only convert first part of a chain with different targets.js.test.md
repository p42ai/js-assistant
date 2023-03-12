
## Input
```javascript input
obj.a && obj.a.property1 && obj.a.property2;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
obj.a?.property1 && obj.a.property2;
```
