
## Input
```javascript input
export default outer() {

  function f() {
    let x = "y" + "z";
  }
  let a = "a" + "b";
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
export default outer() {

  function f() {
    let x = "yz";
  }
  let a = "ab";
}
```
