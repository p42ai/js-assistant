
## Input
```javascript input
const a = <Tag attr={"value"} />
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
  "14-29-JsxAttribute": {
    "actionZones": [
      {
        "range": "15-29",
        "label": "Remove {…} from JSX attribute",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const a = <Tag attr="value" />
```
