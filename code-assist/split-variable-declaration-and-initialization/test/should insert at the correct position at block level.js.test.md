
## Input
```javascript input
{
    f1();
    f2();
    var a = 123;
    f3();
    f4();
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
{
    f1();
    f2();
    var a;
    a = 123;
    f3();
    f4();
}
```
