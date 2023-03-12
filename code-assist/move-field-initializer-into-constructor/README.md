# Move Field Initializer into Constructor Method

## Improvements
* automatically create constructor when there is no constructor yet (needs to consider adding `super()` call correctly and find the right place to insert)

## Safety Evaluation
* safety evaluation: this could actually be safe:
  ```javascript
    class A {
        a = "a-a";

        constructor() {
            console.log({
                step: "A",
                a: this.a,
                b: this.b,
                c: this.c
            });
         }
    }

    class B extends A {
        a = "b-a";
        b = "b-b";
        c;

        constructor() {
            super();
            this.c = "b-c"
            console.log({
                step: "B",
                a: this.a,
                b: this.b,
                c: this.c
            });
        }
    }

    new B();
    ```
* safety issue: use in other fields or in functions
  ```javascript
    class B extends A {
        b = "b-b";
        d = this.b; // here

        constructor() {
            super();
            this.c = "b-c"
            console.log({
                b: this.b,
                d: this.d
            });
        }
    }
  ```