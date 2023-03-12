#### Optional chaining short-circuits for nullish values, but not for other falsy values
When `a && a.b` is replaced with `a?.b`, the execution for types that can have [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) values is changed. This means that the result value and type of the expression can be different with optional chaining.

The following snippet shows some examples:
```javascript
function test(value) {
    console.log(`${value && value.length}, ${value?.length}`);
}

test(undefined);       // undefined, undefined
test(null);            // null, undefined
test(true);            // undefined, undefined
test(false);           // false, undefined
test(1);               // undefined, undefined
test(0);               // 0, undefined
test({});              // undefined, undefined
test([]);              // 0, 0
test({ length: "a" }); // a, a
test('');              // , 0
test(NaN);             // NaN, undefined
```

The empty string, which is falsy, but not [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish), can be especially problematic. Here is an example were introducing optional chaining can lead to problems:
```javascript
// without optional chaining
if (s && s.length === 0) {
  // not called for the empty string 
  // (e.g., legacy code that works this way)
}

// with optional chaining
if (s?.length === 0) {
  // called for the empty string 
  // (potentially introducing undesired behavior)
}
```

#### Optional chaining changes the result for null to undefined
When calling `a?.b` with null, the result is `undefined`. However, with `a && a.b`, the result is `null`.

#### Optional chaining can affect the number of calls with side effects

For example, consider refactoring
```javascript
f() && f().a;
```
into
```javascript
f()?.a;
```

With `&&`, `f` is called one or two times. However, with optional chaining `f` is only called once. If `f` has a side effect, this side effect would have been called a different number of times, potentially changing the behavior. This behavior applies not just to function and methods calls but also to getters that can potentially have side effects.

#### TypeScript does not support optional chaining of the 'void' type

[TypeScript does not support optional chaining for `void`](https://github.com/microsoft/TypeScript/issues/35850), event though the corresponding JavaScript code would work.

```typescript
type Input = void | {
    property: string
};

function f(input: Input) {
    // this works:
    console.log(input && input.property);
    // this breaks because void is not undefined in TypeScript:
    console.log(input?.property);
}
```

#### Old browsers and JavaScript engines do not support optional chaining

Optional chaining is an ES2020 feature. It is supported on all modern browsers and Node 14+, but for older browsers and Node versions, transpilation might be required 
([compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility)). 