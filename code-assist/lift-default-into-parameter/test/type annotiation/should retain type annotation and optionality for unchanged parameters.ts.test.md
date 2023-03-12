
## Input
```javascript input
function f(a?: number, other?: string) {
    other = other != null ? other : "default";
    console.log(a)
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
function f(a?: number, other: string = "default") {
    console.log(a)
}
```
