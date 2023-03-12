
## Input
```javascript input
function C() {
  return (
    <>
      <Component1 />
      <Component2 />
      <Component3 />
    </>
  );
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "60-95"
}
```

## Expected Output
```javascript expected output
function C() {
  return (
    <>
      <Component1 />
      <>
        <Component2 />
        <Component3 />
      </>
    </>
  );
}
```
