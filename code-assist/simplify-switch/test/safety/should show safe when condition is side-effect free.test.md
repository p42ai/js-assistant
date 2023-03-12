
## Input
```javascript input
const condition = true;
switch (condition) {
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "23-46-SwitchStatement": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const condition = true;
```
