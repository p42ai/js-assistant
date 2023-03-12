
## Input
```javascript input
const aValue = "some value";
{
  const anotherValue = 123;
  doSomething("some value");
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
const aValue = "some value";
{
  const anotherValue = 123;
  doSomething(aValue);
}
```
