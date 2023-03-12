
## Input
```javascript input
let a = 123;
a = a + (4 * 2);
a = a + (((4 * 2)));
a = (3 / 4) + a;
a = a + (1, 2);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = 123;
a += 4 * 2;
a += 4 * 2;
a += 3 / 4;
a += (1, 2);
```
