
## Input
```javascript input
const obj = something;
const somethingElse1 = "abc",
      aVariable = obj,
      somethingElse2 = "def";
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "59-59"
}
```

## Expected Output
```javascript expected output
const aVariable = something;
const somethingElse1 = "abc",
      somethingElse2 = "def";
```
