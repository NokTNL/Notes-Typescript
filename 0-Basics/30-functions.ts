/**
 * Function definition with types
 */
// This is basically in-line annotating the argument and return types inside a function definition. However, you can't alias them directly
function myFunc(input: string): string {
  return "";
}
// You can do the same to arrow functions
const myArrowFunc = (input: string): string => {
  return "";
};

/**
 * Function Type Expression
 */
// This is constructing a function type by itself (without actually creating a function), and it can be aliased.
// Confusingly, this also looks like an arrow function
type Callback = (input: string) => string;
function myHigherOrderFunction(cb: Callback) {
  cb("Hi");
}

/**
 * Contextual typing for anonymous functions
 */
// When you put an anonymous function in a place where the type has been pre-defined, the argument types can be inferred instead of being stated explicitly
// (However, if it cannot be inferred, the argument type will become `any`)
myHigherOrderFunction((input) => {
  return input + "Done";
});

/**
 * `void`
 */
// Functions that don't have a return statement / the return statement returns nothing will have an INFERRED `void` return type, even actually the called function will evaluate to `undefined` implicitly
const myFuncThatReturnsNothing = () => {}; // () => void

/**
 * Assignability of `void` return functions
 */
// Sometimes TS doesn't throw errors even though the types don't match between the value and what type is it assigned to.
// This is called "unsounded" assignments.
// They exist in TS to allow certain common practices in JS that are probably safe

// One such example is that functions that has `void` return type can actually return ANYTHING.
// This is because it is very likely that the return value in such case will be discarded
// For example:
const waitForNothing = async () => {
  await new Promise(() => {});
};
[1, 2].forEach(waitForNothing); // Array.forEach expects `void` as the callback's return type, but our function returns Promise<void>. But it shouldn't matter as they are not making use of our Promise!

// !!! However, you cannot explicitly return `void` in FUNCTION DEFINITIONS' return type if you actually return something
function myFuncDeclarationThatReturnsSomething(): void {
  return 4;
}
const myArrowFuncThatReturnsSomething = (): void => {
  return 4;
};

/**
 * Call signature & Construct signatures
 */
// If you want your function type to also have properties / methods, you can define it as an object type and add a call signature to it
interface FunctionWithProperties {
  (args: string): string; // As function
  type: string; // Extra property
  someMethod(): void; // Extra methods
}
// If additionally, your function should be called with `new`, you can add a construct signature (i.e. a call signature with `new` )
// This is very useful, for example, if you are writing a constructor function that also has extra use case (e.g. static methods)
interface CustomConstructor {
  new (): string[]; // As a constructor function
  (): boolean; // As a normal function; you can mix call signature with construct signature
  staticMethod(): void; // Methods
}

/**
 * Generic functions
 */
// Generic functions are those that can handle arguments of multiple types via a type parameter
// This gives you more specific return type based on the input type, instead of just returning any or unknown
// The type parameters are put inside angle brackets <>
function returnFirstElement<Type>(arr: Type[]) {
  return arr[0]; // Return type INFERRED as `Type`
}
// Multiple type paramters
function mapArr<Input, Output>(arr: Input[], fn: (arg: Input) => Output) {
  let result: Output[] = [];
  for (const item of arr) {
    result.push(fn(item));
  }
  return result;
}
// Sometimes if you want to constraint the type that can be passed in, you can constraint it using the `extends` keyword
// That way, only types that satisfy the constraint can be passed in
// For example, you can pass in an Array or string here (Note that TS will not care about the remaining properties of the object):
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
// !!! Note that this is not legal
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    // return { length: minimum }; // !!! You are returning the object { length : number } with that only one property, instead of `Type`. This is not what you promised to return
    //
    // You can for example do this instead:
    return {
      ...obj,
      length: minimum,
    };
  }
}

/**
 * Function overload (only works for function declarations)
 */
// If you want to further restrict the way a function caller uses optional arguments, you can use function overloads
//
// First, you state all the possible combinations of arguments. They are called "Overload Signatures" and will be entirely removed during compilations
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
// Then, you give your actualy function implementation that includes all the scenario listed above, called the "Implementation Signature"
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
// Now, this will have the effect of not allowing the caller to pass in TWO arguments, because the above said you can only call with either ONE or THREE arguments
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3); // This is not allowed by TS (even though it is legal in JS)
