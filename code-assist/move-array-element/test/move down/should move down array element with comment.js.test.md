
## Input
```javascript input
[
  1,
  // comment
  2,
  3,
];
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "22-22",
  "transformationId": "down"
}
```

## Expected Output
```javascript expected output
[
  1,
  3,
  // comment
  2,
];
```
