
## Input
```javascript input
if (a) {
  /*1a*/ f(1) /*1b*/ ; // 1c
} else {
  /*2a*/ f(2) /*2b*/ ; // 2c
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
if (!a) {
  /*2a*/ f(2) /*2b*/ ; // 2c
} else {
  /*1a*/ f(1) /*1b*/ ; // 1c
}
```
