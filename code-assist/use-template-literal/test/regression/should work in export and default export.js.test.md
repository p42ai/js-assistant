
## Input
```javascript input
export default {
  value: "a" + x
};

export const a = {
  value: "b" + x + "b"
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
export default {
  value: `a${x}`
};

export const a = {
  value: `b${x}b`
};
```
