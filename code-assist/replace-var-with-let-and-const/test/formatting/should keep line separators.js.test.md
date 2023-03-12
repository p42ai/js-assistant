
## Input
```javascript input
f(t => {
  var a = g('a'),
      b = g('b');

  g();
  g();
});

var dummy;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f(t => {
  const a = g('a'),
      b = g('b');

  g();
  g();
});

let dummy;
```
