#### Flipping operators can improve the readability of the code
For example, there might be several expressions with similar components which are ordered differently:
```javascript
const a = f(value1) && g();
const b = h() && f(value1);
```

Flipping the `&&` in the second statement can help see the duplication of `f(value1)`:
```javascript
const a = f(value1) && g();
const b = f(value1) && h();
```

#### Flipping operators can be used to evaluate less expensive operations first when short-circuiting
This can help avoid heavy computations:
```javascript
const isOk = heavyComputation() && flag;
```
is flipped to
```javascript
const isOk = flag && heavyComputation();
```