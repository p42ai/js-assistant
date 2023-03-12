
## Input
```javascript input
function C() {
  return (
    <div>
      <Component1 />
      <Component2 />
      <Component3 />
    </div>
  );
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "63-98"
}
```

## Expected Output
```javascript expected output
function C() {
  return (
    <div>
      <Component1 />
      <>
        <Component2 />
        <Component3 />
      </>
    </div>
  );
}
```
