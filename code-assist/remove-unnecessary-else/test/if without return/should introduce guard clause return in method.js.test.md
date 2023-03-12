
## Input
```javascript input
class A {
    m() {
        if (a) {
            f1();
            f2();
        } else {
            f3();
            f4();
        }
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
class A {
    m() {
        if (a) {
            f1();
            f2();
            return;
        }
        f3();
        f4();
    }
}
```
