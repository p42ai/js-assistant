const _ = require("lodash");

// run("array", [1, 2, 3]);

// function f() {
//   run("arguments", arguments);
// }

// f(1, 2, 3);

// run("object array-like", {
//   someProperty: "prop1",
//   length: 3,
//   0: "val0",
//   2: "val1",
// });

// run("string", "hello");

// run("object 2", {
//   a: 3,
// });

// function run(message, o) {
//   console.log(message, _.keys(o), _.isArrayLike(o), Object.keys(o));
//   for (const value of Object.values(o)) {
//     console.log(value);
//   }
//   _.each(o, (value) => {
//     console.log(value);
//   });
// }

// ----------------

const obj = {
  length: 3,
  prop: "property",
  1: "value1",
};

const log = console.log.bind(console);

log("Object.values.forEach");
Object.values(obj).forEach(log);

log();
log("_.each");
_.each(obj, log);

console.log(Object.values(null));
