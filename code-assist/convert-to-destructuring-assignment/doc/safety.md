#### TypeScript type information might need to be refined

In some cases, converting to destructuring can lead to errors on the type verification.

For example, consider the following snippet:

```typescript
type ObjType = {
  [key: string]: string;
};

function f(obj: ObjType) {
  const property: string = obj.property;
}
```

Converting to destructuring would result in:
```typescript
type ObjType = {
  [key: string]: string;
};

function f(obj: ObjType) {
  const { property }: { property: string } = obj;
}
```

However, it cannot be guaranteed that `property` exists on `ObjType`, and TypeScript shows an error.

This can be resolved by marking `property` as optional with `?`:
```typescript
type ObjType = {
  [key: string]: string;
};

function f(obj: ObjType) {
  const { property }: { property?: string } = obj;
}
```