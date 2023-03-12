## Input

```javascript input
const f = () => () => f2("a");
```

## Configuration

```json configuration
{
  "extension": "js"
}
```

## Expected Matches

```json expected matches
{
  "9-29-ArrowFunction": {
    "applicationResult": "applied"
  },
  "15-29-ArrowFunction": {
    "applicationResult": "rejected/conflict"
  }
}
```

## Expected Output

```javascript expected output
const f = () => {
  return () => f2("a");
};
```
