## Input

```javascript input
a.b && a.b.c(f);
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
  "0-16-ExpressionStatement": {
    "suggestion": null
  }
}
```

## Expected Output

```javascript expected output
if (a.b) a.b.c(f);
```
