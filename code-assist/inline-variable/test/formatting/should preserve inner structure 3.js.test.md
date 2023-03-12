
## Input
```javascript input
let aVariable = {
  hello: "world" // comment
};
f(aVariable);
f(aVariable);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f({
  hello: "world" // comment
});
f({
  hello: "world" // comment
});
```
