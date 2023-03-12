There are some scenarios in which lifting out a duplicated statement can lead to a change of behavior:

1. When removing an if-else statement with side-effects in the if-condition, the side-effects are no longer executed.
   For example,
      ```javascript
   let a = "before";

   const f = () => {
       console.log(a);
       return true;
   };

   if (f()) {
       a = "after";
   } else {
       a = "after";
   }
   ```
   prints `"before"` before the refactoring and nothing afterward.

P42 provides safety information when any one of the scenarios is possible.