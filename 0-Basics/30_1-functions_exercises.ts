/**
 * Call & Construct and signature
 */
// Re-implement the Array constructor using an interface, with static methods.
interface MyArrayConstructor {
  new <T>(...items: T[]): T[]; // Called with `new`
  <T>(...items: T[]): T[]; // Called without `new`, identical
  isArray(array: unknown): array is unknown[]; // Static method
}

/**
 * Generic functions & constraints
 */
// Create a "filterMap" methods which receives two callbacks, one for filtering and one for mapping, without using the actual Array methods

function filterMap<Input, Output>(
  inputArr: Input[],
  filterFunc: (item: Input) => boolean,
  mapFunc: (item: Input) => Output
): Output[] {
  let filteredArr: Input[] = [];
  for (const item of inputArr) {
    if (filterFunc(item) === true) {
      filteredArr.push(item);
    }
  }
  let mappedArr: Output[] = [];
  for (const item of filteredArr) {
    mappedArr.push(mapFunc(item));
  }
  return mappedArr;
}
// Test
const testArray = ["11", "1", "2a", "abc", ""];
const isNumStr = (input: string) => !isNaN(parseInt(input));
const parseNumStr = (input: string) => parseInt(input);
const resultArray = filterMap(testArray, isNumStr, parseNumStr);

/**
 * Function Overloads
 */
// Reimplement the Date constructor in a standalone function, using function overload
function dateConstructor(): Date;
function dateConstructor(value: number): Date;
function dateConstructor(dateString: string): Date;
function dateConstructor(dateObj: Date): Date;
function dateConstructor(
  year: number,
  monthIndex: number,
  day?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
): Date;
function dateConstructor(
  arg0?: number | string | Date | undefined,
  monthIndex?: number,
  day?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliseconds?: number
) {
  if (arg0 === undefined) {
    return new Date();
  }
  if (
    typeof arg0 === "string" ||
    arg0 instanceof Date ||
    (typeof arg0 === "number" && monthIndex === undefined)
  ) {
    return new Date(arg0);
  }
  if (typeof arg0 === "number" && typeof monthIndex === "number") {
    return new Date(
      arg0,
      monthIndex,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );
  }
  return new Date("Invalid Date");
}
// string + number not allowed, because of the overloads
dateConstructor("2024-01-01", 3);
