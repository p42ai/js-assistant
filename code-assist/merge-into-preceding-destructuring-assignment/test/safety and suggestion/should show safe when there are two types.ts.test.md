
## Input
```javascript input
const obj = { a: "abc", b: 123 };
const { a }: { a: string } = obj;
const { b }: { b: number } = obj;
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
  "67-101-VariableStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {}
  }
}
```

## Expected Output
```javascript expected output
const obj = { a: "abc", b: 123 };
const { a, b }: { a: string } & { b: number } = obj;
```
