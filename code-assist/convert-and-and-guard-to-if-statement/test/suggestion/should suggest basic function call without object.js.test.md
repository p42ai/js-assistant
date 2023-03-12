## Input

```javascript input
condition && f();
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
  "0-17-ExpressionStatement": {
    "suggestion": {
      "description": "You can convert the && expression to an if-statement.",
      "highlightRanges": ["0-17"]
    }
  }
}
```

## Expected Output

```javascript expected output
if (condition) f();
```
