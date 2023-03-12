There are several scenarios in which moving a duplicated statement out of an if-else statement can lead to a change of behavior:

1. When lifting out a first statement that impacts the evaluation of the if-condition, the if-else might behave differently after the refactoring.
   For example,
   ```javascript
   let a = 2;
   if (a === 2) {
       a = 3;
       console.log("if");
   } else {
       a = 3;
       console.log("else");
   }
   ```
   prints `"if"` before the refactoring and `"else"` afterward.
1. When lifting out a first statement, when the if-condition has side-effects, the statement might behave differently than before.
   For example,
   ```javascript
   let a = "before";

   const f = () => {
       console.log(a);
       return true;
   };

   if (f()) {
       a = "after";
       somethingElse1();
   } else {
       a = "after";
       somethingElse2();
   }
   ```
   prints `"before"` before the refactoring and `"after"` afterward.

P42 provides safety information when any one of the scenarios is possible.