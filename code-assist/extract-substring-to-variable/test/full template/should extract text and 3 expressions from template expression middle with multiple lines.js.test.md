
## Input
```javascript input
const a = `1${a}2
test
abc
3${b1}4as
dd4${b2}5${b3}67
test
abc
8${c}9`;
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "25-57"
}
```

## Expected Output
```javascript expected output
const extractedText = `c
3${b1}4as
dd4${b2}5${b3}67
tes`;
const a = `1${a}2
test
ab${extractedText}t
abc
8${c}9`;
```
