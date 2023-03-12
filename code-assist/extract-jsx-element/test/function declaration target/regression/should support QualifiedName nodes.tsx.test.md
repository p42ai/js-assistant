
## Input
```typescript input
import * as React from 'react';
import * as someNamespace from 'someNamespace';

export const ExampleComponent = (value: someNamespace.Type) => {
  return (
    <Node value={value} />
  );
};
```

## Configuration
```json configuration
{
  "extension": "tsx",
  "selection": "161-183",
  "interactiveInput": {
    "selectOption": {
      "return": "Extract as function declaration"
    }
  }
}
```

## Expected Output
```typescript expected output
import * as React from 'react';
import * as someNamespace from 'someNamespace';

function NewComponent({ value }: {
  value: someNamespace.Type;
}) {
  return <Node value={value} />;
}

export const ExampleComponent = (value: someNamespace.Type) => {
  return (
    <NewComponent value={value} />
  );
};
```
