## Input

```javascript input
a && (b = c);
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
  "0-13-ExpressionStatement": {
    "suggestion": {
      "description": "You can convert the && expression to an if-statement."
    }
  }
}
```

## Expected Output

```javascript expected output
if (a) b = c;
```
