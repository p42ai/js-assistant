## Input

```javascript input
a && a.b && a.b.c();
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
  "0-20-ExpressionStatement": {
    "suggestion": null
  }
}
```

## Expected Output

```javascript expected output
if (a && a.b) a.b.c();
```
