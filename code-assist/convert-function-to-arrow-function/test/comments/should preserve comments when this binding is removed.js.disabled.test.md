
## Input
```javascript input
const f = /*1*/(/*2*/function/*3*/(/*4*/)/*5*/ {/*6*/console.log('1');}/*7*/)/*8*/./*9*/bind/*10*/(/*11*/this/*12*/)/*13*/;
```

## Expected Output
```javascript expected output
const f = /*1*//*2*//*3*/(/*4*/)/*5*/ => {/*6*/console.log('1');}/*7*//*8*//*10*//*9*//*11*//*12*//*13*/;
```
