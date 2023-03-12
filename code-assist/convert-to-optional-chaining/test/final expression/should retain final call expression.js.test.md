
## Input
```javascript input
x && x.f();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
x?.f();
```
