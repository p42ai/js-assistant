### Why is this useful?
Moving duplicated statements out of an if-else removes code duplication and clarifies that their execution is not dependent on the condition of the if statement.

### Mechanics
If the first statement is the same in the if-block and the else-block of an if-statement, then the statement can be pulled out. and moved above the if-statement.