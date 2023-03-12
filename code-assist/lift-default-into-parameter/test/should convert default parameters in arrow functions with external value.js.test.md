
## Input
```javascript input
let y = "abc";
y = f();
const x = (a) => {
  a = a || y;
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let y = "abc";
y = f();
const x = (a = y) => {
};
```
