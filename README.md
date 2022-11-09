# docast-parse

[![conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![npm](https://img.shields.io/npm/v/@flex-development/docast-parse.svg)](https://npmjs.com/package/@flex-development/docast-parse)
[![license](https://img.shields.io/github/license/flex-development/docast-parse.svg)](LICENSE.md)
[![typescript](https://badgen.net/badge/-/typescript?color=2a72bc&icon=typescript&label)](https://typescriptlang.org)

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

This package is a [unified][1] plugin that defines how to take source code as
input and turn it into a [docblock syntax tree][2].

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

  /** @var {number} j - Index of x in {@link u} used to calculate y */
  let j: number = 0

  /** @var {number} k - Index of x in {@link u} used to calculate z */
  let k: number = 0

  // build sequence up to index n (inclusive)
  for (let i = 1; i <= n; i++) {
    /** @const {number} y - `y` */
    const y: number = 2 * u[j]! + 1

    /** @const {number} z - `z` */
    const z: number = 3 * u[k]! + 1

    // set sequence value to smallest value in [y, z]
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
├─0 comment[3] (1:1-5:4, 0-120)
│   │ context: null
│   │ value: "/**\n * @file Katas - dblLinear\n * @module katas/dblLinear\n * @see https://codewars.com/kata/5672682212c8ecf83e000050\n */"
│   ├─0 block-tag[0] (2:4-2:27, 7-30)
│   │     tag: "@file"
│   │     value: "@file Katas - dblLinear"
│   ├─1 block-tag[0] (3:4-3:27, 34-57)
│   │     tag: "@module"
│   │     value: "@module katas/dblLinear"
│   └─2 block-tag[0] (4:4-4:59, 61-116)
│         tag: "@see"
│         value: "@see https://codewars.com/kata/5672682212c8ecf83e000050"
├─1 comment[8] (7:1-29:4, 122-718)
│   │ context: {"identifier":"dblLinear","kind":"function","members":[],"modifiers":["async"],"parent":null,"position":{"end":{"line":59,"column":2,"offset":1509},"start":{"line":30,"column":1,"offset":719}}}
│   │ value: "/**\n * Consider a sequence `u` where `u` is defined as follows:\n *\n * 1. The number `u(0) = 1` is the first one in `u`\n * 2. For each `x` in `u`, `y = 2x + 1` and `z = 3x + 1` must be in `u` too\n * 3. There are no other numbers in `u`\n *\n * Given an index, `n`, the function returns the element at `u(n)`.\n *\n * @async\n *\n * @example\n *  await dblLinear(0) // 1\n * @example\n *  await dblLinear(10) // 22\n * @example\n *  await dblLinear(100) // 447\n * @example\n *  await dblLinear(7687) // 111718\n *\n * @param {number} n - Index of element to get\n * @return {Promise<number>} Element at `u(n)`\n */"
│   ├─0 implicit-description[0] (8:4-14:68, 129-427)
│   │     value: "Consider a sequence `u` where `u` is defined as follows:\n\n1. The number `u(0) = 1` is the first one in `u`\n2. For each `x` in `u`, `y = 2x + 1` and `z = 3x + 1` must be in `u` too\n3. There are no other numbers in `u`\n\nGiven an index, `n`, the function returns the element at `u(n)`."
│   ├─1 block-tag[0] (16:4-16:10, 434-440)
│   │     tag: "@async"
│   │     value: "@async"
│   ├─2 block-tag[0] (18:4-19:28, 447-483)
│   │     tag: "@example"
│   │     value: "@example\n await dblLinear(0) // 1"
│   ├─3 block-tag[0] (20:4-21:30, 487-525)
│   │     tag: "@example"
│   │     value: "@example\n await dblLinear(10) // 22"
│   ├─4 block-tag[0] (22:4-23:32, 529-569)
│   │     tag: "@example"
│   │     value: "@example\n await dblLinear(100) // 447"
│   ├─5 block-tag[0] (24:4-25:36, 573-617)
│   │     tag: "@example"
│   │     value: "@example\n await dblLinear(7687) // 111718"
│   ├─6 block-tag[0] (27:4-27:47, 624-667)
│   │     tag: "@param"
│   │     value: "@param {number} n - Index of element to get"
│   └─7 block-tag[0] (28:4-28:47, 671-714)
│         tag: "@return"
│         value: "@return {Promise<number>} Element at `u(n)`"
├─2 comment[1] (31:3-31:40, 776-813)
│   │ context: {"identifier":"u","kind":"const","members":[],"modifiers":[],"parent":null,"position":{"end":{"line":32,"column":26,"offset":839},"start":{"line":32,"column":3,"offset":816}}}
│   │ value: "/** @const {number[]} u - Sequence */"
│   └─0 block-tag[0] (31:7-31:37, 780-810)
│         tag: "@const"
│         value: "@const {number[]} u - Sequence"
├─3 comment[1] (34:3-34:71, 843-911)
│   │ context: {"identifier":"j","kind":"let","members":[],"modifiers":[],"parent":null,"position":{"end":{"line":35,"column":20,"offset":931},"start":{"line":35,"column":3,"offset":914}}}
│   │ value: "/** @var {number} j - Index of x in {@link u} used to calculate y */"
│   └─0 block-tag[1] (34:7-34:68, 847-908)
│       │ tag: "@var"
│       │ value: "@var {number} j - Index of x in {@link u} used to calculate y"
│       └─0 inline-tag "{@link u}" (34:39-34:48, 879-888)
│             tag: "@link"
│             value: "{@link u}"
├─4 comment[1] (37:3-37:71, 935-1003)
│   │ context: {"identifier":"k","kind":"let","members":[],"modifiers":[],"parent":null,"position":{"end":{"line":38,"column":20,"offset":1023},"start":{"line":38,"column":3,"offset":1006}}}
│   │ value: "/** @var {number} k - Index of x in {@link u} used to calculate z */"
│   └─0 block-tag[1] (37:7-37:68, 939-1000)
│       │ tag: "@var"
│       │ value: "@var {number} k - Index of x in {@link u} used to calculate z"
│       └─0 inline-tag "{@link u}" (37:39-37:48, 971-980)
│             tag: "@link"
│             value: "{@link u}"
├─5 comment[1] (42:5-42:35, 1108-1138)
│   │ context: {"identifier":"y","kind":"const","members":[],"modifiers":[],"parent":null,"position":{"end":{"line":43,"column":36,"offset":1174},"start":{"line":43,"column":5,"offset":1143}}}
│   │ value: "/** @const {number} y - `y` */"
│   └─0 block-tag[0] (42:9-42:32, 1112-1135)
│         tag: "@const"
│         value: "@const {number} y - `y`"
└─6 comment[1] (45:5-45:35, 1180-1210)
    │ context: {"identifier":"z","kind":"const","members":[],"modifiers":[],"parent":null,"position":{"end":{"line":46,"column":36,"offset":1246},"start":{"line":46,"column":5,"offset":1215}}}
    │ value: "/** @const {number} z - `z` */"
    └─0 block-tag[0] (45:9-45:32, 1184-1207)
          tag: "@const"
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

Maximum line length of document.

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
