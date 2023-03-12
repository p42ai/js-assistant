
## Input
```javascript input
if (a) /*1a*/ f() /*1b*/ else /*2a*/ g() /*2b*/
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (!a) /*2a*/ g() /*2b*/ else /*1a*/ f() /*1b*/
```
