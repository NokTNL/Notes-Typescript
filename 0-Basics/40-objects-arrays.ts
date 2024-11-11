/*********
 * Property modifiers
 ********/

/**
 * Optional
 */
// - with `?:`

/**
 * readonly
 */
// - These properties cannot be modified after assignment (Note: the content of the property can still be modified if they are not primitives)

/**
 * Index signature
 */
// - Allows you to define object keys with a certain type instead of a constant string
// - TS only allows `string`, template literal types, `number` and `symbol`, and the union of these types.
// - Literal types for string and number, e.g. `'a'`, `1` etc. are not allowed.
//
// - Note: There can be multiple index signatures and they can go together with constant string keys.
// However, the value type of a number index MUST match that of a string index. This is because JS treats number keys as strings. `number` is a subset of `string` in this case.
// Also, the narrower keys must match the broader key types and their correponsing values
interface IndexSignatureObj {
  [key: string]: string | undefined; // You can use any names, does not need to be `key`
  [key: `id-${string}`]: "regular" | "admin" | undefined; // Matches that of the string index
  [key: number]: number; // Error; does not match that of the string index
  property: number; // Error; does not match that of the string index
}

/******
 * Excess property check at object creation
 ******/
// In theory, an object only need to fulfill all the specified compulsory properties of its type, and excess properties will be ignored
interface Square {
  colour?: string;
  size: number;
}
const mySpecialSquare = {
  size: 2,
  someNonRelavantProp: "abcde",
};
function useColouredSquare(square: Square) {
  console.log(`The square is this big: ${square.size}`);
}
useColouredSquare(mySpecialSquare); // This is sound because TS disregards the `someNonRelavantProp` as it does not matter for the function

// However, during OBJECT CREATION, if you explicitly assign a type to the object, TS will go an extra mile by checking if your object matches ONLY those specified in the assigned type.
// This includes OPTIONAL properties.
// So even though the object is sound for the type, TS thinks that you are PROBABLY making a mistake

const mySquareWithExtraProp: Square = {
  size: 4,
  someExtraProp: "abcde",
};

/******
 * `readonly` arrays & tuples
 ******/
// Readonly arrays do not exist in JS. It is just telling TS that the array's CONTENT is not meant to be changed
// You can use ReadonlyArray<T> or readonly T[] notations to define them
type MyReadonlyArray = ReadonlyArray<string | number>;
type MyReadonlyArray2 = readonly (string | number)[]; // These two are equivalent
const myReadonlyArray: MyReadonlyArray = ["a", 2];
const myReadonlyArray2: MyReadonlyArray2 = ["a", 2];
myReadonlyArray.push(3); // any mutating array methods won't be available

// Tuples also do not exist in JS. It is just telling TS to expect a fixed-structure array.
// You can defined it with a [T] notation
type StringAndNumber = [string, number];
const myTuple: StringAndNumber = ["z", 0]; // [string, number]
// Unlike other languages, you CAN change the content of a TS tuple.
myTuple.shift(); // You CAN change the content of it
myTuple[1]; // !!!! number ; TS won't keep track on how you have changed the content though ...

// That's why you probably want to make `readonly` as well. That is the default when declaring an array with `as const`
const myTupleWithDeclaration = ["a", 3] as const; // readonly ["a", 3] <-- a readonly tuple
myTupleWithDeclaration.shift(); // No longer possible
