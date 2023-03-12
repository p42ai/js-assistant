In JavaScript, `undefined` is not a reserved keyword. 
Instead, it is a property of the global object.
`void 0` was commonly used before ES5 to make the code failsafe against the re-definition of the `undefined` global property
because the `void` operator always returns the true global `undefined`.
With ES5, `undefined` became a read-only global property.

In modern browsers and JavaScript engines, guarding against the re-definition of the `undefined` global property has become an unnecessary complication.
Using only `undefined` makes the code easier to understand, particularly for developers with less JavaScript experience.