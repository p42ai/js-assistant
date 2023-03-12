#### Global variables could be used in other files.
Top-level `var` declarations can declare global variables when the file is not a module, and removing such variables could affect their use in other files.

#### Initial value expressions can have side-effects.
An initial value expression can have side-effects. Consider the following example:

```javascript
let counter = 0;
function count() {
    return ++counter;
}

const a = count();
const b = count();

console.log(b); // 2
```
Here, removing the declaration of the unused variable `a` would change the value of `b` to `1`, because the first `count()` call would be removed.

#### Object destructuring can have side-effects.
Getters can have side-effects that are invoked when destructuring an object.

#### Array destructuring can have side-effects.
Array destructuring can be invoked on any [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), and custom iterable implementations could have side-effects.