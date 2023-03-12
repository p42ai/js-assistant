
## Input
```javascript input
export function App() {
  const handleClick = () => console.log(test);
  return (
    <>
      <div onClick={handleClick}>test</div>
    </>
  );
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "lineEnding": "crlf",
  "selection": "36-36"
}
```

## Expected Output
```javascript expected output
export function App() {
  return (
    <>
      <div onClick={() => console.log(test)}>test</div>
    </>
  );
}
```
