
## Input
```javascript input
const a = "foo 𝌆 bar 💩 baz";
console.log(a);
const b = "foo \u{1D306} bar \u{1F4A9} baz";
console.log(b);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
console.log("foo 𝌆 bar 💩 baz");
console.log("foo \u{1D306} bar \u{1F4A9} baz");
```
