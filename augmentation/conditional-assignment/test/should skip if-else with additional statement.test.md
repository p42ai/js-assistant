
## Input
```javascript input
if (x) {
  f();
  a = '1';
} else {
  a = '2';
}
```

## Expected Augmentation
```json expected augmentations
{
  "0-48-IfStatement": {
    "match": false
  }
}
```
