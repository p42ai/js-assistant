
## Input
```javascript input
!(a !== 1);
```

## Expected Augmentation
```json expected augmentations
{
  "0-10-PrefixUnaryExpression": {
    "match": true,
    "captures": {
      "isStrict": true,
      "isNegated": false,
      "part1": "2-3-Identifier",
      "part2": "7-9-NumericLiteral"
    }
  }
}
```