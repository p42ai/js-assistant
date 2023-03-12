
## Input
```typescript input
@classDecorator
class C {
  @decorator1
  method1() {
  }

  @decorator2
  method2() {
  }
}
```

## Configuration
```json configuration
{
  "extension": "ts",
  "selection": "75-75",
  "transformationId": "up"
}
```

## Expected Output
```typescript expected output
@classDecorator
class C {
  @decorator2
  method2() {
  }

  @decorator1
  method1() {
  }
}
```