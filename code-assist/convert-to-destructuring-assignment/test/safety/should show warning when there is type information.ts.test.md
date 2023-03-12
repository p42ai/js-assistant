

## Input
```javascript input
let something: number = anObject.somethingElse;
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
  "3-46-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "type information could need refinement"
    }
  }
}
```

## Expected Output
```javascript expected output
let { somethingElse: something }: {
  somethingElse: number;
} = anObject;
```
