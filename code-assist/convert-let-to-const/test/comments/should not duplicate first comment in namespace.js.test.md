
## Input
```javascript input
namespace Test {
    // comment
    doSomething();
    
    let a = "123";
    let b = "123";
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
namespace Test {
    // comment
    doSomething();
    
    const a = "123";
    const b = "123";
}
```
