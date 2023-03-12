
## Input
```javascript input
const obj = { a: "abc", b: "a" };
const { a } = obj;
const { b }: { b: string } = obj;
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
  "52-86-VariableStatement": {
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
const obj = { a: "abc", b: "a" };
const { a, b }: { b: string } = obj;
```
