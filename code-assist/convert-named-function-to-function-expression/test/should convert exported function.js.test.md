
## Input
```javascript input
export function a() {
    something();
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
export const a = function() {
    something();
};
```
