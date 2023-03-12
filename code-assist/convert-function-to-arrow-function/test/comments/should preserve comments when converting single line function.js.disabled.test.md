
## Input
```javascript input
f(function (/*0*/) /*1*/{/*2*/console.log('f');/*3*/}/*4*/);
```

## Expected Output
```javascript expected output
f((/*0*/) => /*1*/{/*2*/console.log('f');/*3*/}/*4*/);
```
