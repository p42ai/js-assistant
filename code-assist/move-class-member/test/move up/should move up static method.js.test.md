
## Input
```javascript input
class C {
  method1() {
  }

  /**
   * method2 documentation
   */
  static method2() {
  }
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "70-70",
  "transformationId": "up"
}
```

## Expected Output
```javascript expected output
class C {
  /**
   * method2 documentation
   */
  static method2() {
  }

  method1() {
  }
}
```