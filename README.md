# docast-parse

[![github release](https://img.shields.io/github/v/release/flex-development/docast-parse.svg?include_prereleases&sort=semver)](https://github.com/flex-development/docast-parse/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/docast-parse.svg)](https://npmjs.com/package/@flex-development/docast-parse)
[![codecov](https://codecov.io/gh/flex-development/docast-parse/branch/main/graph/badge.svg?token=R2TPEBGWXB)](https://codecov.io/gh/flex-development/docast-parse)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/docast-parse.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

[**docast**][docast] x [**unified**][unified] plugin to add support for parsing docblock comments.

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`unified().use(docastParse)`](#unifiedusedocastparse)
- [Syntax](#syntax)
  - [Docblock](#docblock)
  - [Markdown](#markdown)
- [Syntax tree](#syntax-tree)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This package is a [unified][unified] plugin that defines how to take [docblock][docblock] input and turn it into a
syntax tree.

## When should I use this?

This plugin adds support to unified for parsing [docblock comments][docblock]. If you don’t use plugins and want to
access the syntax tree directly, you can use [`docast-util-from-docs`][docast-util-from-docs] instead.

You can also combine this plugin with other unified plugins to add extensions for parsing markdown in docblock comments.
Notable packages include [`remark-directive`][remark-directive], [`remark-gfm`][remark-gfm], and
[`remark-math`][remark-math].

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][yarn]:

```sh
yarn add @flex-development/docast-parse
yarn add -D @flex-development/docast @types/mdast @types/unist micromark-util-types
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import docastParse from 'https://esm.sh/@flex-development/docast-parse'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import docastParse from 'https://esm.sh/@flex-development/docast-parse'
</script>
```

## Use

**TODO**: use

## API

This package exports no identifiers. The default export is [`docastParse`](#unifiedusedocastparse).

### `unified().use(docastParse)`

Add support for docblock parsing.

#### Parameters

There are no parameters.

#### Returns

Nothing (`undefined`).

## Syntax

### Docblock

**TODO**: docblock syntax

### Markdown

Markdown is parsed according to CommonMark. Extensions can add support for other syntax and nodes. If you’re interested
in extending markdown, more information is available in the [`mdast-util-from-markdown`][mdast-util-from-markdown] and
[`micromark`][micromark] readmes.

## Syntax tree

The syntax tree is [docast][docast].

## Types

This package is fully typed with [TypeScript][typescript].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[docast-util-from-docs]: https://github.com/flex-development/docast-util-from-docs
[docast]: https://github.com/flex-development/docast
[docblock]: https://github.com/flex-development/docast#docblock-comment
[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh/
[mdast-util-from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown
[micromark]: https://github.com/micromark/micromark
[remark-directive]: https://github.com/remarkjs/remark-directive
[remark-gfm]: https://github.com/remarkjs/remark-gfm
[remark-math]: https://github.com/remarkjs/remark-math
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified
[yarn]: https://yarnpkg.com
