# Move initialization into field declaration

## Improvement Ideas
* automatic field creation (if it does not exist)
  * warn when there is a static field with the same name
  * potential problems with inherited classes
* detect several assignments to the same field in the field in the constructor
* inform the user about initial order changes (requires more analysis)