

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

## Expected Output
```javascript expected output
let { somethingElse: something }: {
  somethingElse: number;
} = anObject;
```
