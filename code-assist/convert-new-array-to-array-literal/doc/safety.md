#### Single numeric parameter is a special case in the Array constructor
The `new Array()` constructor treats a single number argument in a special way. It indicates the size of an otherwise empty array.

```javascript
new Array(3);    // [,,] (empty x3)
new Array("3");  // ["3"]
new Array(3, 2); // [3, 2]
```