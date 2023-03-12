## Improvements

- don't exclude `forEach` when nested function have return statements, but main function does not
- support index with 
  ```javascript
  for (const [index, value] of [1, 2, 3, 4, 5].entries()) {
    console.log(index, value);
  }
  ```

## Bugs
- error when used in `delete` statement