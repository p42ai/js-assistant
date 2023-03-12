## Input

```javascript input
a.b && a.b.c();
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
  "0-15-ExpressionStatement": {
    "suggestion": null
  }
}
```

## Expected Output

```javascript expected output
if (a.b) a.b.c();
```
