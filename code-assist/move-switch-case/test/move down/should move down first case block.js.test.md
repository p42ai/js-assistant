
## Input
```javascript input
switch (condition) {
  case 1:
    doSomething("1");
    break;
  case 2:
    doSomething("2");
    break;
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "23-23",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "18-108-CaseBlock": {
    "actionZones": [
      {
        "range": "23-63",
        "label": "Move case down",
        "level": "regular",
        "kind": "refactor.move.down.switch-case.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["66-66"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
switch (condition) {
  case 2:
    doSomething("2");
    break;
  case 1:
    doSomething("1");
    break;
}
```