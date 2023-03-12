## Input

```javascript input
const a = `a${100000 + 1}b`;
const dummy = 1000;
```

## Configuration

```json configuration
{
  "extension": "js"
}
```

## Expected Output

```javascript expected output
const a = `a${100_000 + 1}b`;
const dummy = 1_000;
```
