
## Input
```javascript input
const a = "3";
console.log(
    a,
    "abc"
);
console.log(a, "abc");
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
console.log(
    "3",
    "abc"
);
console.log("3", "abc");
```
