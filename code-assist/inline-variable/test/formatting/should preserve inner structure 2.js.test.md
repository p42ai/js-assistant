
## Input
```javascript input
let aVariable = { hello: "world" };
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
f({ hello: "world" });
f({ hello: "world" });
```
