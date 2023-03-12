## Input

```javascript input
a && a.b();
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
  "0-11-ExpressionStatement": {
    "suggestion": null
  }
}
```

## Expected Output

```javascript expected output
if (a) a.b();
```
