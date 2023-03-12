
## Input
```javascript input
class C {
  property1;
  constructor(a, b) {
    // comment
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "25-25",
  "transformationId": "up"
}
```

## Expected Matches
```json expected matches
{
  "0-65-ClassDeclaration": {
    "actionZones": [
      {
        "range": "25-63",
        "label": "Move class member up",
        "level": "regular",
        "kind": "refactor.move.up.class-member.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
class C {
  constructor(a, b) {
    // comment
  }
  property1;
}
```