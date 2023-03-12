
## Input
```javascript input
!(a == 1);
```

## Expected Augmentation
```json expected augmentations
{
  "0-9-PrefixUnaryExpression": {
    "match": true,
    "captures": {
      "isStrict": false,
      "isNegated": true,
      "part1": "2-3-Identifier",
      "part2": "6-8-NumericLiteral"
    }
  }
}
```