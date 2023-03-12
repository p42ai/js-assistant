
## Input
```typescript input
function f(): { a: string } {
  const a = "3";
  return {
    a: a,
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```typescript expected output
function f(): { a: string } {
  return {
    a: "3",
  }
}
```
