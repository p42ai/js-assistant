## Input

```javascript input
let a;
switch (x) {
  case "a":
    a = {
      v1: v1,
    };
  case "b":
    a = {
      v1: v1,
    };
}

let b = {
  v2: v2,
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
let a;
switch (x) {
  case "a":
    a = {
      v1,
    };
  case "b":
    a = {
      v1,
    };
}

let b = {
  v2,
};
```
