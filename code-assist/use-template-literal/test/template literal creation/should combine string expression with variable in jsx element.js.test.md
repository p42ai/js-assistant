
## Input
```javascript input
let x = 123;
<Test text={"a" + x + "b"} />
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let x = 123;
<Test text={`a${x}b`} />
```
