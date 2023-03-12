
## Input
```javascript input
let a = () => {
  return `
    ${
  f(1, 2, `
    nested template
`)
}
  
  `;
};
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let a = () => `
    ${
  f(1, 2, `
    nested template
`)
}
  
  `;
```
