
## Input
```javascript input
function C() {
  return (
    <div />
  );
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "30-37"
}
```

## Expected Output
```javascript expected output
function C() {
  return (
    <>
      <div />
    </>
  );
}
```
