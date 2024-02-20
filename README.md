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

[**unified**][unified] compliant parser for [**docast**][docast].

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

This package is a [unified][unified] plugin that defines how to take source code as input and turn it into a [docblock
syntax tree][docast].

## When should I use this?

**TODO**: when should i use this?

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

**TODO**: api

## Syntax

**TODO**: syntax

## Syntax tree

The syntax tree format is [docast][docast].

## Types

This package is fully typed with [TypeScript][typescript].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[docast]: https://github.com/flex-development/docast
[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh/
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified
[yarn]: https://yarnpkg.com
