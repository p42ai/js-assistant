
## Input
```javascript input
function f(a: string, b: number): void {
    console.log("test");
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
const f = function(a: string, b: number): void {
    console.log("test");
};
```
