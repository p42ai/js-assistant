# ConvertSwitchToIfElse

## Improvements
* Switch inside labelled break => introduce block
* Handle breaks better
  * Implement matching and transformation
  * labeled breaks --> retain, they are supported...
    ```javascript
    abc: switch (test) {
  default:
    break abc;
}
```
    * ===> convert unlabelled breaks into labelled breaks
  * test nested inner switch (breaks!)
    * associate breaks with statement (augmentation or function)
* Add suggestions
  * For fall through (single case block with several conditions)
* auto-extract variable vs safety-check? -- auto-extract when more than 2 uses
  * check for naming conflicts
  * requires automatic block creation
* Add safety check
  * safe when only single use (but: could extract automatically??)
* Highlighting
* Add documentation

## Known Bugs