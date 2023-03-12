
## Input
```javascript input
const Component = ({
  parameter
}: {
  parameter: string;
}) => (
  <div>{parameter}</div>
);

const MainComponent = () => (
  <Component parameter="example"></Component>
);
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "6-6"
}
```
