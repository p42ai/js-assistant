
## Input
```javascript input
function genericFunction<T>(value: T) {
  return { value };
}

const concreteFunction = genericFunction<string>;
concreteFunction("a value");
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
function genericFunction<T>(value: T) {
  return { value };
}

genericFunction<string>("a value");
```
