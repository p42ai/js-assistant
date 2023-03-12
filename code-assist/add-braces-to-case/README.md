# AddBracesToCase

## TODOs
* Add safety check
* Add documentation
* Record screencast

## Improvements
* Position of inserted braces could be improved:
  ```javascript expected output
  switch (a) {
    case 1: {
      doSomething1();
      break;
    }
    case 2:
      doSomething2();
      break;
  }
  ```
## Known Bugs
