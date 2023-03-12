
## Input
```vue input
<template>
</template>

<script>
if (condition) {
    doSomething();
}
</script>

<style>
</style>
```

## Configuration
```json configuration
{
  "extension": "vue",
  "lineEnding": "crlf"
}
```

## Expected Matches
```json expected matches
{
  "0-41-IfStatement": {
    "suggestion": null,
    "actionZones": [
      {
        "range": "2-41",
        "level": "regular"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["90-90"]
      }
    ]
  }
}
```

## Expected Output
```vue expected output
<template>
</template>

<script>
if (condition) {
    doSomething();
} else {
    
}
</script>

<style>
</style>
```
