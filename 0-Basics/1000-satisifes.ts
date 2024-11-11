// Sometimes you want TS to infer the type from a literal object/value, but also check if it satisfies a broader constraint
type RGBValues = { [Property in "red" | "green" | "blue"]: number | string };
const rgbWithSomeStringValues: RGBValues = {
  red: "255",
  green: "30",
  blue: "4",
};
// We know that all these values are string, but we can't use string methods now because of the broader type
rgbWithSomeStringValues.red.split(""); // `split` does not exist on number type
// We can instead use `satisfies` to check if a literal value satisfies a certain type constraint without actually applying the type
const rgbWithSomeStringValuesSatisfies = {
  red: "255",
  green: "30",
  blue: "4",
} satisfies RGBValues;
rgbWithSomeStringValuesSatisfies.red.split(""); // Works now
// It will still tell us if the type does not satisfy the constraint:
const rgbWithSomeStringValuesNotSatisify = {
  red: false, // This now throws error
  green: 2,
  blue: "4",
} satisfies RGBValues;

export {};
