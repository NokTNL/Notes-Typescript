/**
 * Primitives
 */
// TS distinguishes between the *primitive* types (immutable simple values w/o properties)
// and *wrapper* object types for those primitives (which are wrapping around a newly created primitive value).
//
// The basics are: string, number, boolean
// - And their corresponding wrapper types are: String, Number, Boolean. *You do not usually need to use these wrapper types explictly*
// When declaring a primitive and using its "properties", TS will understand you are actually using the wrapper object's properties.
const num: number = 4;
const numStr = num.toString(); // Actually using `Number.toString`

/**
 * Less common primitives
 */
// Enums (which affects RUNTIME behaviour), symbol, bigint

/**
 * Function type
 */
// TS allows you to define argument type, so you can use that type in the function body
// Return type can usually be INFERRED from the code but you can specify it as well
function foo1(input: string): string {
  return input.toLocaleUpperCase();
}

/**
 * Object type
 */
// Denoted by `{}` curly braces, and then listing all the properties; `,` and `;` are both accepted
// Optional properties can be denoted with `?:`
function processObj(obj: { a?: string; b: number }) {
  // `a` is optional so need to check if it exists
  if (obj.a) return obj.a.length;

  return obj.b;
}

/**
 * Union type & type narrowing
 */
// Union type ("either or") allows the value taking it to be *one of the* multiple types specified
function foo2(input: number | string) {
  // If the two types happen have any properties in common, TS is smart enough to deduce it for you and allow you to access it straight away
  console.log(input.toString());

  // Otherwise, you can narrow the the type and TS can deduce the narrowed type in the particular context
  if (typeof input === "number") {
    return input.toFixed(2); // TS knows type is `number`
  }
  // TS also knows that `input` can only be `string` here after the code above
  return input.toLocaleUpperCase();
}
// More on type narrowing in `type-narrowing.ts`

/**
 * Type alias
 */
// A type alias allows you to give a name to a certain type so you can reuse it
// The same type can be given different aliases at the same time, TS doesn't care. It only cares about the actual type structure

/**
 * Interfaces
 */
// Interface is an alterantive way to give names to OBJECT types
// You can between interface and type aliases interchangeable, except with some behviour difference

/**
 * Literal types
 */
// TS allows type to be restricted to a specific value of the primitive types (string, number, boolean)
// When defining variables, `let` and `var` will infer types to the generic primitive type, while `const` will be inferred as the literal type (because it can't be changed later)
// BUT!!! (Just like Javascript), properties of an object can be redefined later even when defined as a `const` so those will not have an inferred literal type
const myObj = {
  count: 3,
}; // inferred as {count: number}
// If you are not thinking to reassign the property later, you can add `as const` to force it to infer as a literal type
const myObj2 = {
  count: 3,
} as const; // inferred as {readonly count: 3}, or:
const myObj3 = {
  count: 3 as const,
}; // inferred as {count: 3}

// Usually very useful when defining a union of literal types so you can restrict the values that can be assumed by a certain variable
