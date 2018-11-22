# envdoctor

[![codecov](https://codecov.io/gh/jukben/envdoctor/branch/master/graph/badge.svg)](https://codecov.io/gh/jukben/envdoctor)
[![CircleCI](https://circleci.com/gh/jukben/envdoctor.svg?style=svg)](https://circleci.com/gh/jukben/envdoctor)

> ⚠️ This is very early stage of the project. I've putted it together literally in few hours. Use on your own risk.

This is framework how to easily create set of test to ensure that environment is correctly setup.

It's kinda something like ESLint but to test your environment.

| Package                                  | Stable                                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `@envdoctor/core`                        | [![Version][envdoctor-core-version]][envdoctor-core-package]                           |
| `@envdoctor/utils`                       | [![Version][envdoctor-utils-version]][envdoctor-utils-package]                         |
| `@envdoctor/envdoctor-config-essentials` | [![Version][envdoctor-config-essentials-version]][envdoctor-config-essentials-package] |

## Install

`yarn add @envdoctor/core -D`

## How to use

First you have to create a configure file:

- .doctorrc file in JSON or YAML format
- .doctorrc.json file
- .doctorrc.yaml, .doctorrc.yml, or .doctorrc.js file
- doctor.config.js file exporting a JS object

Let's use `.doctorrc.js` as in `example/` folder

```
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

```
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

## Advanced configurations

### extends

You can use either name (string) which should match installed package.

- @scoped (will be resolved as @scoped/envdoctor-config)
- @scoped/package-name (will be resolved as @scoped/envdoctor-config-package-name with a fallback to @scoped/package-name)
- package-name (will be resolved as envdoctor-config-package-name with a fallback to package-name)

You can also pass your own configuration as an object for example extends: `[@envdoctor/essentials", require("./doctor")]`. See `/example` implementation for more details.

### rules

Every defined rule is automatically checked. You can change this with syntax

```
 "yarn-version": 0, // disable rule; [0], "off", "disable" acts the same
```

or you can change severity of the rule to "warn" by

```
 "yarn-version": [1, "1.9.0"], // you can also use "warn", ["warn] acts the same
```

## Implementation of your own rule

This is actually really similar as example above

```
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

> static `description` field could be also an function to get the same arguments as the check itself. Could be convenient for generic checks. (Check the `testPort.js` implementation in `/example`)

As you can see, if the function returns string, it means the check failed and the string is used as reason. To pass the check please return undefined, or boolean / true.

### Utilities

There are set of utilities currently provided by `@envdoctor/core` package.

- exec (which is re-exported https://github.com/sindresorhus/execa)

  > const {stdout} = await execa.shell('echo unicorns');

  > const { stdout } = await exec("node", ["-v"]);

#### Usage

> This is example implementation of node-version.js

[Source code](https://github.com/jukben/envdoctor/blob/master/packages/envdoctor-config-essentials/src/rules/node-version.ts)

```js
const { exec } = require("envdoctor");
const semver = require("semver");

const yarnVersion = async (version = "v8") => {
  const { stdout } = await exec("node", ["-v"]);

  if (!semver.gt(semver.coerce(stdout), semver.coerce(version))) {
    return `${version} is required, ${stdout} is installed`;
  }
};

yarnVersion.description = "Check Node version";

export default yarnVersion;
```

## Implementation of your own configuration

Configuration is basically JSON object which defines the rules. Check the `@envdoctor/envdoctor-config-essentials` implementation for example.

[envdoctor-core-version]: https://img.shields.io/npm/v/@envdoctor/core.svg?style=flat-square
[envdoctor-core-package]: https://www.npmjs.com/package/@envdoctor/core
[envdoctor-utils-version]: https://img.shields.io/npm/v/@envdoctor/utils.svg?style=flat-square
[envdoctor-utils-package]: https://www.npmjs.com/package/@envdoctor/utils
[envdoctor-config-essentials-version]: https://img.shields.io/npm/v/@envdoctor/envdoctor-config-essentials.svg?style=flat-square
[envdoctor-config-essentials-package]: https://www.npmjs.com/package/@envdoctor/envdoctor-config-essentials
