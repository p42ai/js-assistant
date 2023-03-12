#### #-Private is a ES2022 feature
Private class features are part of ES2022. If you target older browser, you need to transpile your code to make it compatible.

#### Indirect access with overridden 'this' can break
Methods marked as `private` in TypeScript are not truly private. At runtime, they are similar to other JavaScript methods, and therefore calls to them could be replaced when the `this` reference to an object is changed.

Consider the following class:
```typescript
class C {
    private value = 1;
    setValue(newValue: number) {
        this.value = newValue;
    }
}
```

The property `value` is private. However, the method `setValue` that calls it could be invoked with a different `this`, e.g., as follows:
```typescript
const c = new C();
const o = {
  value: 2
}

c.setValue.call(o, 3);
console.log(o); // { value: 3 }
```

When `private value` gets changed into `#value`, this access pattern breaks with a `TypeError`:
```typescript
class C {
    #value = 1;
    setValue(newValue: number) {
        this.#value = newValue;
    }
}

const c = new C();
const o = {
  value: 2
}

c.setValue.call(o, 3); // raises TypeError
console.log(o);
```