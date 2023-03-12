
## Input
```javascript input
function C() {
  return (
    <div>
      <Component1 />
      <Component2>
        text
        <div>text</div>
        text
      </Component2>
      text
      <Component3 />
    </div>
  );
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "63-145"
}
```

## Expected Output
```javascript expected output
function C() {
  return (
    <div>
      <Component1 />
      <>
        <Component2>
          text
          <div>text</div>
          text
        </Component2>
      </>
      text
      <Component3 />
    </div>
  );
}
```
