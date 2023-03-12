
## Input
```javascript input
class Test {
    // comment 1
    // comment 2
    constructor() {}

    m1() {
        let a = "123";
    }

    m2() {
        let b = "123";
    }
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
class Test {
    // comment 1
    // comment 2
    constructor() {}

    m1() {
        const a = "123";
    }

    m2() {
        const b = "123";
    }
}
```
