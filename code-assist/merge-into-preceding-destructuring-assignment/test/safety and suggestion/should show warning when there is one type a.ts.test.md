
## Input
```javascript input
const obj = { a: "abc", b: 123 };
const { a }: { a: string } = obj;
const { b } = obj;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "67-86-VariableStatement": {
    "safety": {
      "level": "WARNING",
      "message": "merged type is incomplete"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
const obj = { a: "abc", b: 123 };
const { a, b }: { a: string } = obj;
```
