
## Input
```javascript input
function f<A>(a: A): A {
    console.log("test");
    return a;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const f = function<A>(a: A): A {
    console.log("test");
    return a;
};
```
