
## Input
```vue input
<template>
</template>

<script>
first();
second();
</script>

<style>
</style>
```

## Configuration
```json configuration
{
  "extension": "vue",
  "selection": "33-33",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "0-20-SourceFile": {
    "actionZones": [
      {
        "range": "1-9",
        "label": "Move statement down",
        "level": "regular",
        "kind": "refactor.move.down.statement.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["43-43"]
      },
      {
        "type": "HIGHLIGHT",
        "highlights": ["43-51"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
<template>
</template>

<script>
second();
first();
</script>

<style>
</style>
```
