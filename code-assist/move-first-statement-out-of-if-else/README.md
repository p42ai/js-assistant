## Improvements

- support if-else chains
- Show only warning for variable safety when variable name is taken but not used in outer scope
- Check for side-effects and mark as save if both condition and statements have no side-effects
- Support multi-declarations and deconstruction when moving variable statements
- Support identification of type narrowing (which can lead to problems):
  ```
  const module: reconnect.CustomModule<NetConnectOpts | string | number, Socket> = reconnect(arg => {
    // TS can't resolve passing even the simplest union types to function overloads :-/
    // (see TS issue #14107)
    if (typeof arg === "string") {
        return connect(arg);
    } else if (typeof arg === "number") {
        return connect(arg);
    } else {
        return connect(arg);
    }
  });
  ```