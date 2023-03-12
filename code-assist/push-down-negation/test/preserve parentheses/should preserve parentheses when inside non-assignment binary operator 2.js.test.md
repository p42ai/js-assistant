
The parentheses are not strictly needed because of operator precedence, 
but they make the result easier to understand. If the user has a formatter
setup, it will remove the unnecessary parentheses in that step.

## Input
```javascript input
a || !(b || c);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
a || (!b && !c);
```
