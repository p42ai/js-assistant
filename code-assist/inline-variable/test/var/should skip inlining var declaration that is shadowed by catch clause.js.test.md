
## Input
```javascript input
function f() {
  try {
    throw 1;
  } catch (err) {
    var err = "123";
    log(err);
  }
  log(err);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
