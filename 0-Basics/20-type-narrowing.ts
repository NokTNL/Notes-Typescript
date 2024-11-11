/**
 * Built-in type guards
 */
// TS anlyses certain JS expressions in the code that can limit the type of a value, and will infer the most specific type in that context

// `typeof`
// !!! Note that Javscript is weird that `null` has a type of `object` =__= so this will happen:
function checkIsObject(input: { name: number } | string | null) {
  if (typeof input === "object") {
    return input; // `null` also satisfy it so it is inferred as `{name: number} | null` !
  }
}
// Better off checking `value === null` in this case

// Truthiness narrowing: `&&`, `||`, `!`, `Boolean` (`??` as well but it only filters for `null` or `undefined`)
// !! Note that while TS knows the literal types `""` and `0` are falsy, but if you just throw it a `string` or `number,
// , it won't give you a type of "it is a string but not `""` (enmpty string) "
// All TS knows is that string / number can be truthy / falsy so it will not be filtered out regardless
// But at least you will be freed from having runtime errors for null / undefined
function checkTruthinessTwice(input: string | number | null | undefined) {
  if (input) {
    // string | number here
    if (!input) {
      return input; // *still* string | number here, although should never reach this line
    }
  }
}

// Equality narrowing: ==, !=, ===, !==
function myFunc(input: string | number) {
  if (input === "1" || input === "2") {
    return input; // Not only just `string`, but all the way to `"1" | "2"`!
  }
}
// Even this will work:
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    x; // string
    y; // string; TS knows that `x` and `y` are the same type here, so can only be `string`!
  } else {
    x; // string | number
    y; // string | boolean
  }
}

// `in` operator, which filters out only the objects that contain that property in the type definition
// !! optional properties will NOT be useful for filtering here

// `instanceof`
// If a class exists in the object's prototype chain, it will have properties of that class

// Assignments of `let` or `var`
// It only works if you define the variable with a union type in the place
let x: string | number = 6;
x = "";
x; // string
x = 6;
x; // number

/**
 * Type predicates
 */
// If you want more fine-grained control over the narrowing, you can define your own logic for it
// A type predicate is basically a function that returns a boolean to tell if an entity is of a certain type
// You just need to modify the return type declaration a bit:
type Fish = { swim: () => void };
type Bird = { fly: () => void };
function isBird(animal: Fish | Bird): animal is Bird {
  return Math.random() < 0.5; /* Because I like it random! */
}
function letAnimalDoItsThing(animal: Fish | Bird) {
  animal.fly(); // TS error; does not know if fly is callable or not yet
  animal.swim(); // TS error; does not know if swim is callable or not yet

  // Once the type predicate is called
  if (isBird(animal)) {
    animal.fly(); // Bird; TS knows that only Bird is possible
  } else {
    animal.swim(); // Fish
  }
}
// If you involve the built-in type guards in the return values, TS can actually INFER that you are defining a type predicate
function checkIsNull(input: unknown) {
  return input === null;
} // The return type is inferred as `input is null`!

/**
 * Discriminated unions
 */
// If you have two object types in a union which has a COMMON PROPERTY, TS can use that to narrow the union if you check that property

/**
 * `never`
 */
// When you narrow a union till no possibility is left, the remaining type will be `never`, which means the type shouldn't have existed

/**
 * What doesn't work
 */
// Narrowing an object by checking directly on its property
function checkIfCountIsNumber(obj: { count?: number | string }) {
  const count = obj.count;
  if (typeof obj.count === "number") {
    obj; // { count?: number }; no effect
    obj.count; // number; This works because we checked `obj.count` in an if statement
    count; // string | number | undefined ; Doesn't work on reassigned values either
  }
}
