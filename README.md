<div align="center">
 <img src="https://user-images.githubusercontent.com/8135252/48912582-4ff7ed80-ee76-11e8-8eb4-68ed699ea0c4.png" alt="Envdoctor" title="Envdoctor" width="300">
 <p>the linter for your enviroment™</p>

<p align="center">
  <a href="https://codecov.io/gh/productboardlabs/envdoctor"><img src="https://codecov.io/gh/productboardlabs/envdoctor/branch/master/graph/badge.svg"></a>
  <a href="https://circleci.com/gh/productboardlabs/envdoctor"><img src="https://circleci.com/gh/productboardlabs/envdoctor.svg?style=svg"></a>
  <img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square">
</p>
 
</div>

## Table of Contents

- [Introduction](#introduction)
- [Install](#install)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)

## Introduction

> ⚠️ This is still very early stage of the project! Use on your onw risk

This is a framework for easy creation of a set of checks to ensure that environment is correctly set up.

It's kind of like ESLint for your environment.

## Install

To install the core functionality (`envdoctor` binary)

`yarn add @envdoctor/core -D`

or

`npm install @envdoctor/core --dev`

### Packages

| Package                                  | Stable                                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `@envdoctor/core`                        | [![Version][envdoctor-core-version]][envdoctor-core-package]                           |
| `@envdoctor/utils`                       | [![Version][envdoctor-utils-version]][envdoctor-utils-package]                         |
| `@envdoctor/envdoctor-config-essentials` | [![Version][envdoctor-config-essentials-version]][envdoctor-config-essentials-package] |

### Documentation

Documentation could be found at https://productboardlabs.github.io/envdoctor/.

Have you build something awesome? Let's share it with us.

## Contributing

There is actually solid test coverage, so you should be safe. You can use `example/` folder as playground.

Run:

- `yarn run bootstrap` for bootstrap
- `yarn build:watch` for continuous building
- `yarn test:watch` for tests

### Contributors

Also, I'd love to thank these wonderful people for their contribution ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)). You rock! 💪

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/8135252?v=4" width="100px;"/><br /><sub><b>Jakub Beneš</b></sub>](https://jukben.cz)<br />[🐛](https://github.com/jukben/envdoctor/issues?q=author%3Ajukben "Bug reports") [💻](https://github.com/jukben/envdoctor/commits?author=jukben "Code") [🎨](#design-jukben "Design") [📖](https://github.com/jukben/envdoctor/commits?author=jukben "Documentation") [🤔](#ideas-jukben "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/140393?v=4" width="100px;"/><br /><sub><b>Tomas Ruzicka</b></sub>](http://linkedin.com/in/tomruzicka)<br />[📖](https://github.com/jukben/envdoctor/commits?author=LeZuse "Documentation") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

The MIT License (MIT) 2019 productboard

<!-- urls -->

[envdoctor-core-version]: https://img.shields.io/npm/v/@envdoctor/core.svg?style=flat-square
[envdoctor-core-package]: https://www.npmjs.com/package/@envdoctor/core
[envdoctor-utils-version]: https://img.shields.io/npm/v/@envdoctor/utils.svg?style=flat-square
[envdoctor-utils-package]: https://www.npmjs.com/package/@envdoctor/utils
[envdoctor-config-essentials-version]: https://img.shields.io/npm/v/@envdoctor/envdoctor-config-essentials.svg?style=flat-square
[envdoctor-config-essentials-package]: https://www.npmjs.com/package/@envdoctor/envdoctor-config-essentials
