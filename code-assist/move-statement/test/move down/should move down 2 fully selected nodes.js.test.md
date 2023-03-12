
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
  "selection": "14-41",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "0-69-SourceFile": {
    "actionZones": [
      {
        "range": "14-41",
        "label": "Move statement down",
        "level": "regular",
        "kind": "refactor.move.down.statement.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["28-55"]
      },
      {
        "type": "HIGHLIGHT",
        "highlights": ["28-41", "42-55"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
statement1();
statement4();
statement2();
statement3();
statement5();
```
