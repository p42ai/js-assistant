
## Input
```javascript input
const q = () => {
  let a;
  if (x) {
    switch (y1) {
      case "1":
        a = f1();
        break;
      case "2":
        if (z1) {
          a = f21();
        } else {
          a = f22();
        }
        break; // retained bc of different paths
    }
  } else {
    switch (y2) {
      case "a":
        a = f3();
        break;
      case "b":
        a = f4();
        break;
      default:
        a = f5();
        break;
    }
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

## Expected Output
```javascript expected output
const q = () => {
  let a;
  if (x) {
    switch (y1) {
      case "1":
        return f1();
      case "2":
        if (z1) {
          return f21();
        } else {
          return f22();
        }
        break; // retained bc of different paths
    }
  } else {
    switch (y2) {
      case "a":
        return f3();
      case "b":
        return f4();
      default:
        return f5();
    }
  }
  return a;
};
```
