
## Input
```javascript input
this.a != null && this.a.b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
this.a?.b;
```
