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
- [Make your own configuration](#make-your-own-configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

> ⚠️ This is very early stage of the project... but we're using this in [productboard](https://productboard.com) :)

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

## Configuration

Idea behind envdoctor is simple and it's heavily inspired by ESLint and other similar tools I've used in past or I'm still using.

First you have to create a configuration file:

- `.envdoctorrc` file in JSON or YAML format
- `.envdoctorrc.json` file
- `.envdoctorrc.yaml`, `.envdoctorrc.yml`, or `.envdoctorrc.js` file
- doctor.config.js file exporting a JS object
- envdoctor filed in `package.json`

> If you are interested in demo project, let's check it out [example/](https://github.com/jukben/envdoctor/tree/master/example) folder.☝

Let's create `.envdoctorrc.js` and do simple configuration.

```js
module.exports = {
  extends: ["@envdoctor/essentials"],
  rules: {
    "yarn-version": [2, "1.9.0"],
    "node-version": [2, "v8"]
  }
};
```

So what have we done so far? Field `extends` means from which **configurations** we want to _inherit_ the rules. You can think about it as preset.

> To use `@envdoctor/essentials` properly, please install `@envdoctor/envdoctor-config-essentials` package

Then let's add script into the `package.json` like this:

```json
...
"scripts": {
  "doctor": "envdoctor"
},
...
```

Now you should be able to run:

```bash
yarn run doctor
```

and if so, you going to get the result:

```
✔ Check Node version
✔ Check Yarn version
```

Awesome! 🚀

Do you know what's going on under the hood? Let's check it out following chapter.

## Advanced configuration

### extends

This field is basically holding the configuration with rules definition. You can use either name (string) which should match installed package.

- @scoped (will be resolved as @scoped/envdoctor-config)
- @scoped/package-name (will be resolved as @scoped/envdoctor-config-package-name with a fallback to @scoped/package-name)
- package-name (will be resolved as envdoctor-config-package-name with a fallback to package-name)

You can also pass your own configuration as an object for example easily with `require`:

```js
extends: [@envdoctor/essentials", require("./doctor")]
```

See `/example` implementation for more details.

### rules

The rule is a heart of every configuration. In the end the all rules has to be defined in the format of an array:

```json
[severity, parameter, function]
```

_Severity_ is suppose to be:

- `0` - turned off, `1` - warn, `2` - error
- `off` or `disabled`
- `on` or `enabled`
- `warn`
- `error`

_Parameter_ is suppose to be whatever your function (rule) will play together.

_Function_ is the definition of the rule. Very simple example bellow:

```js
function ownRuleImplementation(arg) {
  return "Failed Hello " + arg;
}

ownRuleImplementation.description = "This is just example";
```

> static `description` field could be also a function to get the same arguments as the check itself. Could be convenient for generic checks. (Check the `testPort.js` implementation in `/example`)

When we put everything together we will get somehting like this:

```js
rules {
 "own-rule": [2, "World", ownRuleImplementation],
 ...
}
```

In real world this rule always fails (with an error!) because we are returning `string` in the implementation. If we want to "pass" the check, let's return anything else.

Every defined rule is automatically going to be checked. That means also rules you are extending from the `extends`. You can of course disable those rules for example like this:

```js
 "yarn-version": 0, // disable rule; [0], "off", "disable" acts the same
```

or you can change severity of the rule to "warn" by

```js
 "yarn-version": [1, "1.9.0"], // you can also use "warn", ["warn] acts the same
```

## Make your own configuration

Configuration is basically a JSON object which defines the rules. Check the `@envdoctor/envdoctor-config-essentials` implementation for example.

Have you build something awesome? Let's share it with us.

<!-- urls -->

[envdoctor-core-version]: https://img.shields.io/npm/v/@envdoctor/core.svg?style=flat-square
[envdoctor-core-package]: https://www.npmjs.com/package/@envdoctor/core
[envdoctor-utils-version]: https://img.shields.io/npm/v/@envdoctor/utils.svg?style=flat-square
[envdoctor-utils-package]: https://www.npmjs.com/package/@envdoctor/utils
[envdoctor-config-essentials-version]: https://img.shields.io/npm/v/@envdoctor/envdoctor-config-essentials.svg?style=flat-square
[envdoctor-config-essentials-package]: https://www.npmjs.com/package/@envdoctor/envdoctor-config-essentials

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

The MIT License (MIT) 2018 - Jakub Beneš
