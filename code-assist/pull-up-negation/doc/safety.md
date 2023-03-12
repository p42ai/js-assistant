When the operator is `&&` or `||`, the resulting value can change into a boolean. The falsy/truthy state of the return value will be the same as before, so flipping the operator is often safe in conditions but unsafe in assignments and expressions.

When the operator is `<`, `<=`, `>` or `>=` the result for `NaN` and nullish values can change.