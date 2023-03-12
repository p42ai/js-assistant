
## Input
```javascript input
anObject.aProperty = anObject.aProperty - 4;
anObject.aProperty = anObject.aProperty * 5;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
The operation is safe, because the getter and then the setter is called for both `a.x += 1` and `a.x = a.x + 1`.

```json expected matches
{
  "0-43-BinaryExpression": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
anObject.aProperty -= 4;
anObject.aProperty *= 5;
```
