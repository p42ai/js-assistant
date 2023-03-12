
## Input
```javascript input
class C {
  m() { 
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      console.log(element);
    }
  }
}
```

## Expected Augmentation
```json expected augmentations
{
  "17-145-ForStatement": {
    "match": true,
    "captures": {
      "arrayExpression": "42-56-PropertyAccessExpression",
      "elementBinding": {
        "type": "Binding",
        "scope": "69-145-Block",
        "name": "element"
      }
    },
    "data": {
      "type": "for-element"
    }
  }
}
```
