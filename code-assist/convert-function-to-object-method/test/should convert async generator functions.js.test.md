

## Input
```javascript input
const a = {
  f: async function*(i) {
    yield i;
  }
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
const a = {
  async* f(i) {
    yield i;
  }
};
```
