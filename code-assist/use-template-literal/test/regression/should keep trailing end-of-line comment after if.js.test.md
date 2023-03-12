
## Input
```javascript input
{
    if (count === 0) return; // nothing to do
    const x = "a" + "b";
}

const a = "a" + "b";
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
{
    if (count === 0) return; // nothing to do
    const x = "ab";
}

const a = "ab";
```
