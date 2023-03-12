
## Input
```javascript input
class C {
  aMethod() {
    for (let i = 0; i < this.items.length; i++) {
      doSomething(this.items[i]);
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

## Expected Matches
```json expected matches
{
  "23-113-ForStatement": {
    "postEditActions": [
      {
        "type": "HIGHLIGHT",
        "highlights": ["28-56", "77-81"]
      },
      {
        "type": "RENAME",
        "position": 48
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
class C {
  aMethod() {
    this.items.forEach((item) => {
      doSomething(item);
    });
  }
}
```
