# Move const to outer scope

## Improvements
* Support moving non-constant variables (determine best scope based on bindings)
  * Easier case: all bindings are imports
  * Need to evaluate any potential binding modification (could also be a good warning for extract)
  * What about modification (return array case)?
* Support object/array binding pattern

## Known Issues 
  * Potential issues with mass refactoring, when several variables with the same name are moved:
    ```javascript
    const arrow = (aParameter) => {
      const aConstant = "value";
      return aConstant + aParameter;
    }
    const arrow2 = (aParameter) => {
      const aConstant = "value";
      return aConstant + aParameter;
    }
    ```