// The below talks about creating types from other types.

/*****
 * Generics
 *****/
/**
 * Generic Paramter Defaults
 */
//
// Sometimes it is useful to make a type parameter OPTIONAL by having a fallback type, e.g. if we return something as a fallback
// Example:
function returnSelfOrNull<T>(input?: T) {
  if (!input) return null; // null
  return input; // NonNullable<T>
} // --> This function returns NonNullable<T> | null

const nothing = returnSelfOrNull(); // NonNullable<unknown> | null --> {} | null
const something = returnSelfOrNull("abc"); // "abc" | null

// We can improve it with function overloads:
function returnSelfOrNull2(): null;
function returnSelfOrNull2<T>(input: T): T;
function returnSelfOrNull2<T>(input?: T) {
  if (!input) return null;
  return input;
}

const nothing2 = returnSelfOrNull2(); // null 👍🏼
const something2 = returnSelfOrNull2("abc"); // "abc" 👍🏼

// Alternatively, we can actually INCLUDES null in the type T
function returnSelfOrNull3<T = null>(input?: T) {
  if (!input) return null as T; // Assertion needed, otherwise null will not be considered a T
  return input;
} // Now this function just returns T

const nothing3 = returnSelfOrNull3(); // null 👍🏼
const something3 = returnSelfOrNull3("abc"); // "abc" 👍🏼

/*****
 * `keyof` operator
 *****/
// It takes in an object and returns the union of all possible keys
// It also works for index signature. However, remember that:
// - (Keys definition) `number | string` ---> `string` (Equivalent in index signature)
// The opposite happens when you extract the keys out from index signature
// - (Index signature) `string` ---> `string | number` (Extracted keys)
type Keys = keyof { [key: string]: any }; // string | number

/**
 * Mapped types
 */
// Mapped types make it possible to use a union of literal values for keys in an object (which you can't do with index signature)
type MappedType = {
  [Property in "a" | "b"]: number;
};
// You can even "map the keys" to new names using the `as` keyword
type Animals = "crocodile" | "horse";
type MappedToLiteralString = {
  [AnimalName in Animals as `${AnimalName}-name`]: string;
}; // { "crocodile-name": string; "horse-name": string; }

/*****
 * Conditional types
 *****/
// This allows you to return different types based on if the type satisfies a certain constraint or not.
// This is very useful for utility types
interface Circle {
  radius: number;
}
interface ColouredCircle extends Circle {
  colour: string;
}
type MostSpecialCharacteristics<T> = T extends ColouredCircle
  ? `colour-${T["colour"]}-radius-${T["radius"]}`
  : T extends Circle
  ? `radius-${T["radius"]}`
  : never;

// testing it out:
type ColourAndRadiusString = MostSpecialCharacteristics<{
  colour: string;
  radius: number;
}>; // `colour-${string}-radius-${number}`
type RadiusString = MostSpecialCharacteristics<{ radius: number }>; // `radius-${number}`
type Never = MostSpecialCharacteristics<{}>; // `never`

// *** Conditional types are DISTRIBUTIVE for union types. It means applying to the type to each union member, instead of the union as a whole.
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // --> string[] | number[]
// This is how the `Exclude` util type works:
type MyExclude<UnionType, Excluded> = UnionType extends Excluded
  ? never
  : UnionType;
type StringOnly = Exclude<"a" | "b", "a">; // never | 'b' --> 'b'

// *** We can go further by digging inside the `extends` type and make use of it in the true branch of the conditional type, using `infer`
// Here `infer` defines a type parameter ad-hoc
// For example, this is how the `Return` util type works:
type MyReturnType<Func extends (...args: any[]) => any> = Func extends (
  ...args: any[]
) => infer Return
  ? Return
  : never;

type ReturnedNumber = MyReturnType<(input: number) => number>; // `number`
