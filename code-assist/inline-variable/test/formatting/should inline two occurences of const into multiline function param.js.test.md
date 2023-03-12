
Note: both references are on the same line on purpose (so that the preceeding whitespace is different).

## Input
```javascript input
const a = "3";
console.log(
    "abc",
    a, a
);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "6-6"
}
```

## Expected Output
```javascript expected output
console.log(
    "abc",
    "3", "3"
);
```
