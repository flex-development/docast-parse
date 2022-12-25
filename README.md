# docast-parse

[![npm](https://img.shields.io/npm/v/@flex-development/docast-parse.svg)](https://npmjs.com/package/@flex-development/docast-parse)
[![license](https://img.shields.io/github/license/flex-development/docast-parse.svg)](LICENSE.md)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

[**unified**][1] compliant file parser for [**docast**][2].

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
- [Syntax](#syntax)
- [Syntax tree](#syntax-tree)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This package is a [unified][1] plugin that defines how to take source code as input and turn it into a [docblock syntax
tree][2].

## When should I use this?

**TODO**: Update documentation.

## Install

This package is [ESM only][3].

```sh
yarn add @flex-development/docast-parse
```

From Git:

```sh
yarn add @flex-development/docast-parse@flex-development/docast-parse
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/features/protocols#git'>Git - Protocols | Yarn</a>
    &nbsp;for details on requesting a specific branch, commit, or tag.
  </small>
</blockquote>

## Use

Say we have the following module `dbl-linear.ts`:

```typescript
/**
 * @file Katas - dblLinear
 * @module katas/4kyu/dblLinear
 * @see https://codewars.com/kata/5672682212c8ecf83e000050
 */

/**
 * Consider a sequence `u` where `u` is defined as follows:
 *
 * 1. The number `u(0) = 1` is the first one in `u`
 * 2. For each `x` in `u`, `y = 2x + 1` and `z = 3x + 1` must be in `u` too
 * 3. There are no other numbers in `u`
 *
 * Given an index, `n`, the function returns the element at `u(n)`.
 *
 * @async
 *
 * @example
 *  await dblLinear(0) // 1
 * @example
 *  await dblLinear(10) // 22
 * @example
 *  await dblLinear(100) // 447
 * @example
 *  await dblLinear(7687) // 111718
 *
 * @param {number} n - Index of element to get
 * @return {Promise<number>} Element at `u(n)`
 */
async function dblLinear(n: number): Promise<number> {
  /** @const {number[]} u - Sequence */
  const u: number[] = [1]

  /** @var {number} j - Index of x in {@linkcode u} used to calculate y */
  let j: number = 0

  /** @var {number} k - Index of x in {@linkcode u} used to calculate z */
  let k: number = 0

  /*
   * build sequence up to index n (inclusive)
   */
  for (let i = 1; i <= n; i++) {
    /** @const {number} y - `y` */
    const y: number = 2 * u[j]! + 1

    /** @const {number} z - `z` */
    const z: number = 3 * u[k]! + 1

    /* set sequence value to smallest value in [y, z] */
    u[i] = Math.min(y, z)

    // increase of index of x used to calculate y by 1
    if (u[i] === y) j++

    // increase of index of x used to calculate z by 1
    if (u[i] === z) k++
  }

  return u[n]!
}

export default dblLinear
```

We just discovered [VitePress][4]. We want to [create a documentation site
without duplicating documentation][5]:

```typescript
import type { Root } from '@flex-development/docast'
import docastParse, { type Options } from '@flex-development/docast-parse'
import fs from 'node:fs/promises'
import { unified } from 'unified'
import { inspect } from 'unist-util-inspect'

const tree: Root = unified()
  .use<[Options?], string, Root>(docastParse)
  .parse(await fs.readFile('dbl-linear.ts', 'utf8'))

console.debug(inspect(tree))
```

...running that yields:

```sh
root[7]
├─0 comment[3] (1:1-5:4, 0-125)
│   │ context: null
│   │ value: "/**\n * @file Katas - dblLinear\n * @module katas/4kyu/dblLinear\n * @see https://codewars.com/kata/5672682212c8ecf83e000050\n */"
│   ├─0 block-tag[0] (2:4-2:27, 7-30)
│   │     tag: "@file"
│   │     text: "Katas - dblLinear"
│   │     value: "@file Katas - dblLinear"
│   ├─1 block-tag[0] (3:4-3:32, 34-62)
│   │     tag: "@module"
│   │     text: "katas/4kyu/dblLinear"
│   │     value: "@module katas/4kyu/dblLinear"
│   └─2 block-tag[0] (4:4-4:59, 66-121)
│         tag: "@see"
│         text: "https://codewars.com/kata/5672682212c8ecf83e000050"
│         value: "@see https://codewars.com/kata/5672682212c8ecf83e000050"
├─1 comment[8] (7:1-29:4, 127-723)
│   │ context: {"identifier":"dblLinear","kind":"function","parent":null,"position":{"end":{"line":61,"column":2,"offset":1536},"start":{"line":30,"column":1,"offset":724}}}
│   │ value: "/**\n * Consider a sequence `u` where `u` is defined as follows:\n *\n * 1. The number `u(0) = 1` is the first one in `u`\n * 2. For each `x` in `u`, `y = 2x + 1` and `z = 3x + 1` must be in `u` too\n * 3. There are no other numbers in `u`\n *\n * Given an index, `n`, the function returns the element at `u(n)`.\n *\n * @async\n *\n * @example\n *  await dblLinear(0) // 1\n * @example\n *  await dblLinear(10) // 22\n * @example\n *  await dblLinear(100) // 447\n * @example\n *  await dblLinear(7687) // 111718\n *\n * @param {number} n - Index of element to get\n * @return {Promise<number>} Element at `u(n)`\n */"
│   ├─0 implicit-description[0] (8:4-14:68, 134-432)
│   │     value: "Consider a sequence `u` where `u` is defined as follows:\n\n1. The number `u(0) = 1` is the first one in `u`\n2. For each `x` in `u`, `y = 2x + 1` and `z = 3x + 1` must be in `u` too\n3. There are no other numbers in `u`\n\nGiven an index, `n`, the function returns the element at `u(n)`."
│   ├─1 block-tag[0] (16:4-16:10, 439-445)
│   │     tag: "@async"
│   │     text: ""
│   │     value: "@async"
│   ├─2 block-tag[0] (18:4-19:28, 452-488)
│   │     tag: "@example"
│   │     text: "await dblLinear(0) // 1"
│   │     value: "@example\n await dblLinear(0) // 1"
│   ├─3 block-tag[0] (20:4-21:30, 492-530)
│   │     tag: "@example"
│   │     text: "await dblLinear(10) // 22"
│   │     value: "@example\n await dblLinear(10) // 22"
│   ├─4 block-tag[0] (22:4-23:32, 534-574)
│   │     tag: "@example"
│   │     text: "await dblLinear(100) // 447"
│   │     value: "@example\n await dblLinear(100) // 447"
│   ├─5 block-tag[0] (24:4-25:36, 578-622)
│   │     tag: "@example"
│   │     text: "await dblLinear(7687) // 111718"
│   │     value: "@example\n await dblLinear(7687) // 111718"
│   ├─6 block-tag[0] (27:4-27:47, 629-672)
│   │     tag: "@param"
│   │     text: "{number} n - Index of element to get"
│   │     value: "@param {number} n - Index of element to get"
│   └─7 block-tag[0] (28:4-28:47, 676-719)
│         tag: "@return"
│         text: "{Promise<number>} Element at `u(n)`"
│         value: "@return {Promise<number>} Element at `u(n)`"
├─2 comment[1] (31:3-31:40, 781-818)
│   │ context: {"identifier":"u","kind":"const","parent":"dblLinear","position":{"end":{"line":32,"column":26,"offset":844},"start":{"line":32,"column":3,"offset":821}}}
│   │ value: "/** @const {number[]} u - Sequence */"
│   └─0 block-tag[0] (31:7-31:37, 785-815)
│         tag: "@const"
│         text: "{number[]} u - Sequence"
│         value: "@const {number[]} u - Sequence"
├─3 comment[1] (34:3-34:75, 848-920)
│   │ context: {"identifier":"j","kind":"let","parent":"dblLinear","position":{"end":{"line":35,"column":20,"offset":940},"start":{"line":35,"column":3,"offset":923}}}
│   │ value: "/** @var {number} j - Index of x in {@linkcode u} used to calculate y */"
│   └─0 block-tag[1] (34:7-34:72, 852-917)
│       │ tag: "@var"
│       │ text: "{number} j - Index of x in {@linkcode u} used to calculate y"
│       │ value: "@var {number} j - Index of x in {@linkcode u} used to calculate y"
│       └─0 inline-tag "{@linkcode u}" (34:39-34:52, 884-897)
│             tag: "@linkcode u"
│             text: "u"
│             value: "{@linkcode u}"
├─4 comment[1] (37:3-37:75, 944-1016)
│   │ context: {"identifier":"k","kind":"let","parent":"dblLinear","position":{"end":{"line":38,"column":20,"offset":1036},"start":{"line":38,"column":3,"offset":1019}}}
│   │ value: "/** @var {number} k - Index of x in {@linkcode u} used to calculate z */"
│   └─0 block-tag[1] (37:7-37:72, 948-1013)
│       │ tag: "@var"
│       │ text: "{number} k - Index of x in {@linkcode u} used to calculate z"
│       │ value: "@var {number} k - Index of x in {@linkcode u} used to calculate z"
│       └─0 inline-tag "{@linkcode u}" (37:39-37:52, 980-993)
│             tag: "@linkcode u"
│             text: "u"
│             value: "{@linkcode u}"
├─5 comment[1] (44:5-44:35, 1132-1162)
│   │ context: {"identifier":"y","kind":"const","parent":"dblLinear","position":{"end":{"line":45,"column":36,"offset":1198},"start":{"line":45,"column":5,"offset":1167}}}
│   │ value: "/** @const {number} y - `y` */"
│   └─0 block-tag[0] (44:9-44:32, 1136-1159)
│         tag: "@const"
│         text: "{number} y - `y`"
│         value: "@const {number} y - `y`"
└─6 comment[1] (47:5-47:35, 1204-1234)
    │ context: {"identifier":"z","kind":"const","parent":"dblLinear","position":{"end":{"line":48,"column":36,"offset":1270},"start":{"line":48,"column":5,"offset":1239}}}
    │ value: "/** @const {number} z - `z` */"
    └─0 block-tag[0] (47:9-47:32, 1208-1231)
          tag: "@const"
          text: "{number} z - `z`"
          value: "@const {number} z - `z`"
```

## API

This package exports no identifiers. The default export is `docastParse`.

### `unified().use(docastParse[, options])`

Add support for parsing text to [docblock syntax trees][2].

#### `options`

File parsing options (optional).

#### `options.indent_size`

<small>Default: <code>2</code></small>

Indentation size (in single-spaced characters).

#### `options.max_line_length`

<small>Default: <code>80</code></small>

Maximum line length of source file.

## Syntax

**TODO**: Update documentation.

## Syntax tree

The syntax tree format is [docast][2].

## Types

This package is fully typed with [TypeScript][6].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://github.com/unifiedjs/unified
[2]: https://github.com/flex-development/docast
[3]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[4]: https://vitepress.vuejs.org
[5]: https://github.com/vuejs/vitepress/issues/1316
[6]: https://www.typescriptlang.org
