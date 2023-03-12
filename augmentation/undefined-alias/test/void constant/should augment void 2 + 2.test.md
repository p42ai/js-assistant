
## Input
```javascript input
void (2 + 2);
```

## Expected Augmentation
```json expected augmentations
{
  "0-12-VoidExpression": {
    "match": true,
    "captures": {
      "type": "void-constant"
    }
  }
}
```