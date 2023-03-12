
## Input
```javascript input
<Element
  attribute1={1}
  attribute2={2}
  attribute3={3}
>text</Element>
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-28",
  "transformationId": "down"
}
```

## Expected Output
```javascript expected output
<Element
  attribute1={1}
  attribute3={3}
  attribute2={2}
>text</Element>
```
