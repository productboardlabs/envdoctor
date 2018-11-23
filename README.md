<div align="center">
 <img src="https://user-images.githubusercontent.com/8135252/48912582-4ff7ed80-ee76-11e8-8eb4-68ed699ea0c4.png" alt="Envdoctor" title="Envdoctor" width="300">
 <p>the linter for you enviroment™</p>

<p align="center">
  <a href="https://codecov.io/gh/jukben/envdoctor"><img src="https://codecov.io/gh/jukben/envdoctor/branch/master/graph/badge.svg"></a>
  <a href="https://circleci.com/gh/jukben/envdoctor"><img src="https://circleci.com/gh/jukben/envdoctor.svg?style=svg"></a>
  <img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square">
</p>
 
</div>

## Table of Contents

- [Introduction](#introduction)
- [Install](#install)
- [Configuration](#configuration)
  - [Advanced configuration](#advanced-configuration)
  - [Implementation of your own rule](#implementation-of-your-own-rule)
  - [Make your own configuration](#make-your-own-configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

> ⚠️ This is very early stage of the project. I've put it together literally in a few hours. Use on your own risk.

This is a framework for easy creation of a set of checks to ensure that environment is correctly set up.

It's kind of like ESLint for your environment.

## Install

`yarn add @envdoctor/core -D`

### Packages

| Package                                  | Stable                                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `@envdoctor/core`                        | [![Version][envdoctor-core-version]][envdoctor-core-package]                           |
| `@envdoctor/utils`                       | [![Version][envdoctor-utils-version]][envdoctor-utils-package]                         |
| `@envdoctor/envdoctor-config-essentials` | [![Version][envdoctor-config-essentials-version]][envdoctor-config-essentials-package] |

## Configuration

First you have to create a configuration file:

- .doctorrc file in JSON or YAML format
- .doctorrc.json file
- .doctorrc.yaml, .doctorrc.yml, or .doctorrc.js file
- doctor.config.js file exporting a JS object

Let's use `.doctorrc.js` as in the `example/` folder

```js
module.exports = {
  extends: ["essentials"],
  rules: {
    "yarn-version": [2, "1.9.0"],
    "node-version": [2, "v8"]
  }
};
```

> for `essentials` please install `@envdoctor/envdoctor-config-essentials` package

Then we can add script into `package.json`

```json
...
"scripts": {
  "doctor": "envdoctor"
},
...
```

Now you should be able to run

`yarn run doctor`

and you would get (if you pass the test :) )

```
✔ Check Node version
✔ Check Yarn version
```

### Advanced configuration

#### extends

You can use either name (string) which should match installed package.

- @scoped (will be resolved as @scoped/envdoctor-config)
- @scoped/package-name (will be resolved as @scoped/envdoctor-config-package-name with a fallback to @scoped/package-name)
- package-name (will be resolved as envdoctor-config-package-name with a fallback to package-name)

You can also pass your own configuration as an object for example `extends: [@envdoctor/essentials", require("./doctor")]`. See `/example` implementation for more details.

#### rules

Every defined rule is automatically checked. You can change this with syntax

```
 "yarn-version": 0, // disable rule; [0], "off", "disable" acts the same
```

or you can change severity of the rule to "warn" by

```
 "yarn-version": [1, "1.9.0"], // you can also use "warn", ["warn] acts the same
```

### Implementation of your own rule

This is actually really similar to the example above

```js
function ownRuleImplementation(arg) {
   return "Failed Hello " + arg;
}

ownRuleImplementation.description = "This is just example"

...

rules {
 "own-rule": [2, "World", ownRuleImplementation],
 ...
}
```

> static `description` field could be also a function to get the same arguments as the check itself. Could be convenient for generic checks. (Check the `testPort.js` implementation in `/example`)

As you can see, if the function returns string, it means the check failed and the string is used as reason. To pass the check please return undefined, or boolean / true.

### Make your own configuration

Configuration is basically a JSON object which defines the rules. Check the `@envdoctor/envdoctor-config-essentials` implementation for example.

# Usage

Just add `envdoctor` to your `package.json`

```json
"scripts": {
  "doctor": "envdoctor"
}
```

And you are set!

<!-- urls -->

[envdoctor-core-version]: https://img.shields.io/npm/v/@envdoctor/core.svg?style=flat-square
[envdoctor-core-package]: https://www.npmjs.com/package/@envdoctor/core
[envdoctor-utils-version]: https://img.shields.io/npm/v/@envdoctor/utils.svg?style=flat-square
[envdoctor-utils-package]: https://www.npmjs.com/package/@envdoctor/utils
[envdoctor-config-essentials-version]: https://img.shields.io/npm/v/@envdoctor/envdoctor-config-essentials.svg?style=flat-square
[envdoctor-config-essentials-package]: https://www.npmjs.com/package/@envdoctor/envdoctor-config-essentials

## Contributing

There is actually solid test coverage, so you should be safe.

### Contributors

Also, I'd love to thank these wonderful people for their contribution ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)). You rock! 💪

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/8135252?v=4" width="100px;"/><br /><sub><b>Jakub Beneš</b></sub>](https://jukben.cz)<br />[🐛](https://github.com/jukben/envdoctor/issues?q=author%3Ajukben "Bug reports") [💻](https://github.com/jukben/envdoctor/commits?author=jukben "Code") [🎨](#design-jukben "Design") [📖](https://github.com/jukben/envdoctor/commits?author=jukben "Documentation") [🤔](#ideas-jukben "Ideas, Planning, & Feedback") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

The MIT License (MIT) 2018 - Jakub Beneš
