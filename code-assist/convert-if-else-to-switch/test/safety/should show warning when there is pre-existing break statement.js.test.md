
## Input
```javascript input
const x = value;
for (const value of values) {
  if (x === 1) {
    break;
  } else if (x === 2) {
    fb();
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "49-49"
}
```

## Expected Matches
```json expected matches
{
  "46-112-IfStatement": {
    "safety": {
      "level": "WARNING",
      "message": "behavior of existing break statements could change"
    }
  }
}
```

## Expected Output
```javascript expected output
const x = value;
for (const value of values) {
  switch (x) {
    case 1:
      break;
      break;
    case 2:
      fb();
      break;
  }
}
```
