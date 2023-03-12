
## Input
```javascript input
f((await getRandom())!);
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "2-22"
}
```

## Expected Output
```javascript expected output
const random = (await getRandom())!;
f(random);
```
