
## Input
```javascript input
const q = () => {
  let a;
  switch (x) {
    case 1:
      a = f1();
      // missing break
    case 2:
      somethingElse();
      break;
  }
  return a;
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
