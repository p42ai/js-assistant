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
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output

```javascript expected output
if (a) b = c;
```
