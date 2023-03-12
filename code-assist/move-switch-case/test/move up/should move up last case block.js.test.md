
## Input
```javascript input
switch (condition) {

  // comment
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
  "selection": "80-80",
  "transformationId": "up"
}
```

## Expected Matches
```json expected matches
{
  "18-122-CaseBlock": {
    "actionZones": [
      {
        "range": "80-120",
        "label": "Move case up",
        "level": "regular",
        "kind": "refactor.move.up.switch-case.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["24-24"]
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
  // comment
  case 1:
    doSomething("1");
    break;
}
```