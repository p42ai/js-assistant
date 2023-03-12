## Improvements

* Support pushing parameters with defaults into IIFE where possible (e.g. when the argument is never `undefined`)
* More precise matching of 'arguments' occurrence in function (nested functions, use as property)
* Side-effect evaluation of arguments (if all arguments have no side-effects, they are safe to inline in any order - when there are no defaults)
* Check environment and use `var` for pre-ES2015

## Bugs

### Push parameter not available on `alpha()`
```
(function(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
})(alpha(), "a", gamma());
```