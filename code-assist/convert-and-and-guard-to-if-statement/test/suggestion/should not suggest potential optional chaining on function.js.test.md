## Input

```javascript input
f && f();
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
  "0-9-ExpressionStatement": {
    "suggestion": null
  }
}
```

## Expected Output

```javascript expected output
if (f) f();
```
