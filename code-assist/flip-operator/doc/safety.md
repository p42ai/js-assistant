#### Flipping operators can change the result value of short-circuiting operations
The resulting value can change when the operator is `&&` or `||`. The falsy/truthy state of the resulting value will be the same as before, so flipping the operator is often safe in conditions but unsafe in assignments and expressions.

#### Flipping operators changes the evaluation order
When there are side-effects on both sides of the expression, the order of their execution changes, leading to different behavior.
When the operator is a short-circuiting operator, and there is a side effect on any side of the expression, it may not be invoked in the same cases after flipping.

####  String concatenation
Flipping the `+` operator changes the result of the string concatenation operation.