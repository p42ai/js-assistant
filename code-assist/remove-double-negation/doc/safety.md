#### Removes conversion to boolean
Double negation changes a value into a boolean. Removing it can lead to a non-boolean value being used in expressions or assignments.

When conversion to boolean is needed, a more straightforward way for converting a value to boolean is `Boolean(aCondition)`.