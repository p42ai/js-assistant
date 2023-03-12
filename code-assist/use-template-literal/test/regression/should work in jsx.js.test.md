
## Input
```javascript input
const a = <Component attribute={"a" + "b"}></Component>;
const b = (
  <>
    <Component attribute={"a" + "b"}></Component>
    text
    <Component attribute={"c" + "d"} a2="1" a3="2"></Component>
  </>
);
const c = <Component attribute={"e" + "f"} />;
const d = <Component {...{ a: "g" + "h"}} />;
const e = <Component attribute={...{ a: "g" + "h"}} />;

const dummy = "a" + "b";
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = <Component attribute={"ab"}></Component>;
const b = (
  <>
    <Component attribute={"ab"}></Component>
    text
    <Component attribute={"cd"} a2="1" a3="2"></Component>
  </>
);
const c = <Component attribute={"ef"} />;
const d = <Component {...{ a: "gh"}} />;
const e = <Component attribute={...{ a: "gh"}} />;

const dummy = "ab";
```
