
## Input
```javascript input
class C {
  property1;
  property2;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "12-12"
}
```

## Expected Matches
```json expected matches
{
  "0-37-ClassDeclaration": {
    "actionZones": [
      {
        "range": "12-22",
        "label": "Move class member down",
        "level": "regular",
        "kind": "refactor.move.down.class-member.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
class C {
  property2;
  property1;
}
```