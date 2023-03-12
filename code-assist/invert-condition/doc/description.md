### Why is this useful?
Negated expressions take more cognitive effort to reason about than regular expressions. Inverting negated conditions can remove unnecessary complexity. One exception is nullish comparisons where, for example, `!= null` indicates the existence of a value.

### Mechanics
The condition of the if statement or conditional expression is negated. The then and else blocks or expressions are exchanged.