/**
 * Conditional types
 */
// Re-implement the following utility types: NonNullable
type MyNonNullable<Type> = Type extends null
  ? never
  : Type extends undefined
  ? never
  : Type; // The real implementation is just `Type & {}`, because anything except null and undefined is an object in TS
type StringAndNumberOnly = MyNonNullable<string | number | null | undefined>;
