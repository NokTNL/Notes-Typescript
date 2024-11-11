// 1. Index signature

// HTML atrributes including `hidden`, `aria-label` and `data-*`
interface HTMLDataAttribute {
  hidden?: string;
  "aria-label"?: string;
  [attr: `data-${string}`]: string | undefined;
}

// Define the Array type, with some Array properties and methods
interface CustomArray<Item> {
  length: number;
  indexOf: (item: Item, fromIndex?: number) => number;
  [index: number]: Item;
}
// Test
const numArray: CustomArray<number> = [1, 2, 3]; // Compatible with native arrays
const num0_numberIndex = numArray[0]; // number
const num0_stringIndex = numArray["0"]; // number !!!! JS array allows using string index in arrays and knows that 0 and `0` are equivalent

// 2. Tuples & readonly arrays

// Write a function that transform an [x, y] array into an { x, y } object
function xyTupleToObject(tuple: [number, number]) {
  return { x: tuple[0], y: tuple[1] };
}
xyTupleToObject([1, 2]);

// Implement React's useState function (not caring about the use case of not passing an argument to it)
function rerender() {}
function useState<T>(init: T | (() => T)) {
  let state = typeof init === "function" ? (init as () => T)() : init;

  function setState(newStateOrUpdateFunc: T | ((prevState: T) => T)) {
    state =
      typeof newStateOrUpdateFunc === "function"
        ? (newStateOrUpdateFunc as (prevState: T) => T)(state)
        : newStateOrUpdateFunc;
    rerender();
  }

  return [state, setState] as const; // It is way easier to let TS infer it than to define it explicitly ourselves
}
// Test
const [state, setState] = useState<string | undefined>(undefined);
state; // string | undefined
setState("abc");
setState((prev) => prev + "cde");
const [state2, setState2] = useState(() => [1, 2, 3]);
state2; // number[]
