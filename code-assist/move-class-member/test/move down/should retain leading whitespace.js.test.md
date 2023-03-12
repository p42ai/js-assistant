
## Input
```javascript input
class C {

  property1;
  property2;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "13-13"
}
```



## Expected Output
```javascript expected output
class C {

  property2;
  property1;
}
```