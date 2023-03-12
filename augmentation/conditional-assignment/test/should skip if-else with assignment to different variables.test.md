
## Input
```javascript input
if (x) {
  a = '1';
} else {
  b = '2';
}
```

## Expected Augmentation
```json expected augmentations
{
  "0-41-IfStatement": {
    "match": false
  }
}
```
