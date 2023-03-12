## Input

```javascript input
const a = <Tag attr="value" />;
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
  "14-27-JsxAttribute": {
    "actionZones": [
      {
        "range": "15-27",
        "kind": "refactor.rewrite.toggle.braces.jsx-attribute.p42",
        "label": "Add {…} to JSX attribute",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output

```javascript expected output
const a = <Tag attr={"value"} />;
```
