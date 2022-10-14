# docast

[![conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![npm](https://img.shields.io/npm/v/@flex-development/docast.svg)](https://npmjs.com/package/@flex-development/docast)
[![license](https://img.shields.io/github/license/flex-development/docast.svg)](LICENSE.md)
[![typescript](https://badgen.net/badge/-/typescript?color=2a72bc&icon=typescript&label)](https://typescriptlang.org)

> **Doc**block **A**bstract **S**yntax **T**ree.

## Install

```sh
yarn add @flex-development/docast
```

### GitHub Package Registry

To install from the GitHub Package Registry:

1. Setup a `.npmrc` or `.yarnrc.yml` file to authenticate with the registry

   **`.npmrc`**

   ```ini
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   @flex-development:registry=https://npm.pkg.github.com/
   ```

   **`.yarnrc.yml`**

   ```yaml
   npmRegistries:
     //npm.pkg.github.com:
       npmAlwaysAuth: true
       npmAuthToken: ${GITHUB_TOKEN}

   npmScopes:
     flex-development:
       npmRegistryServer: https://npm.pkg.github.com
   ```

   where `GITHUB_TOKEN` is a [Personal Access Token with the `read:packages`
   scope][1].

2. Run install command

   ```sh
   yarn add @flex-development/docast
   ```

### Git

See [npm-install][2] or [Git - Protocols | Yarn][3] for details on requesting a
specific branch, commit, or tag.

#### NPM

```sh
npm i flex-development/docast
```

#### Yarn

```sh
yarn add @flex-development/docast@flex-development/docast
```

## Usage

**TODO**: Update documentation.

[1]:
    https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries
[2]: https://docs.npmjs.com/cli/v8/commands/npm-install#description
[3]: https://yarnpkg.com/features/protocols#git
