
## Input
```javascript input
statement1();
statement2();
statement3();
statement4();
statement5();
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-55",
  "transformationId": "up"
}
```

## Expected Matches
```json expected matches
{
  "0-69-SourceFile": {
    "actionZones": [
      {
        "range": "28-55",
        "label": "Move statement up",
        "level": "regular",
        "kind": "refactor.move.up.statement.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["14-41"]
      },
      {
        "type": "HIGHLIGHT",
        "highlights": ["14-27", "28-41"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
statement1();
statement3();
statement4();
statement2();
statement5();
```
