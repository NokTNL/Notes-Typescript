## Installation

- `npm i -D typescript` (or `npm i -g typescript` if you want to install it globally)
  - If you use `npm i -D typescript`, you can use `npx tsc` to use the TS compiler
  - If you use `npm i -g typescript`, you can simply run `tsc` to use the TS compiler

## Basics

- The problems with Javscript:
  - It gives you **runtime** error if you try to access something undefined / non-callable (`TypeError: xxxx`), which is probably "too late"
  - Auto-completion for object properties is lacking
  - No expectation of function return values
- Typescript runs your code through a compiler and give you static type-checking, before running your code. This catches a lot of legitimate bugs ("it is probably wrong"; sometimes it can be too strict)
- With the proper tooling, it can also give smart hints on what types / properties you can expect while writing your code, on the fly

## Syntax

```ts
let a: number = 3; // Explicit type
```

- Most of the time, the types can be inferred for you, and you don't need to type it

```ts
let a = 3; // tsc knows that `a` has the type `number`
```

- **Any valid JS is also valid TS**, although it may have ambiguous types. For example

```ts
function greet(person, date) {
  return person + Date.toString();
}
```

`person` and `date` will both have the type `any` because TS cannot infer the type.

## tsc (the TS compiler)

- When tsc is run on a file, given that no errors has been thrown, it will output a JS file, which looks pretty much the same as your TS file, except that all type annotations are gone
- Even if errors are thrown, it still emits JS files by default! It tries to be minimally invasive
  - If you want to be more strict, you can simply run: `tsc --noEmitOnError`
- Sometimes the compiler will transform TS syntax into something else, depending on the **compiling target**. By default it is ES3 (released in 1999!). This is called "Downleveling".

  - You can change the compile target, e.g. `tsc --target es2015` will compile to ES6

- If you want to leverage the most out of TS, you can use the `--strict` flag to enable some safety features (full list of flags turned on [here](https://www.typescriptlang.org/tsconfig/#strict)). Or you can turn them on individually:
  - `noImplicitAny`: does not allow types that cannot be inferred and therefore having the `any` type
  - `strictNullChecks`: By default, if a type inferred contains `null` or `undefined` values, **tsc simply ignores it 🤯**. Turning this on will prevent that.
