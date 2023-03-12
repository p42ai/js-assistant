#### Undefined can be shadowed by a local variable
While changing the `undefined` global property is no longer possible, `undefined` can still be shadowed by a local variable:

```javascript
const undefined = "i am not the real undefined";
let check = aVariable === void 0; // void 0 is needed here
```

However, this is not a best practice, and having local variables with the name `undefined` should be avoided.

#### The 'undefined' global property can be redefined in ancient browsers
ES5 is from 2009, and all modern browsers and JavaScript environments prevent changes to the `undefined` global property.
However, this is not the case for ancient browsers such as Internet Explorer 8.