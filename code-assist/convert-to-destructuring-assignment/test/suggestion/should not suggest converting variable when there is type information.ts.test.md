

## Input
```javascript input
let something: number = anObject.something;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Matches
```json expected matches
{
  "3-42-VariableDeclaration": {
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
let { something }: {
  something: number;
} = anObject;
```
