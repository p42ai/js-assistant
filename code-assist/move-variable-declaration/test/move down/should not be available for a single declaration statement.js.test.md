
## Reason
In single declaration statements, it would block moving the statement instead, which is a natural interaction.

TODO this should test that there is no blocked zone, which is currently not possible.

## Input
```javascript input
const a = 1;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "5-11-VariableDeclaration": null
}
```