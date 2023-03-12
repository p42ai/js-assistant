#### Extracting targets of method calls can change the 'this' reference
Consider the following example:
```javascript
const anObject = {
    doSomething() {
        console.log({
            isObject: this === anObject,
            isGlobal: this === globalThis
        })
    }
}

anObject.doSomething(); // prints { isObject: true, isGlobal: false }
```
Extracting `anObject.doSomething` into a new variable `extracted` changes the `this` reference of the method call and its behavior:
```javascript
const extracted = anObject.doSomething;
extracted();            // prints { isObject: false, isGlobal: true }
```

#### Assignment targets are not extracted
The left side of assignment expressions is not extracted, because it would change the program behavior.

Consider following example:
```javascript
anObject.aProperty = 123; // assignment to anObject.aProperty
```

Extracting `anObject.aProperty` into a variable would mean that the assignment would change the variable, but not the object property:

```javascript
const aVariable = anObject.aProperty;
aVariable = 123; // does not change anObject.aProperty
```

P42 does not extract such assignment targets.