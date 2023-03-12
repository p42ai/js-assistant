
## Input
```javascript input
if (a) {
  f(); // comment 2a
} else {
  g(); // comment 1
  f(); // comment 2b
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
if (a) {
} else {
  g(); // comment 1
}
f(); // comment 2b
```
