---
id: configuration
title: Configuration
---

## First configuration

Now, it's the time for configuration. There are many ways how is _evndoctor_ able to consume configuration:

- `.envdoctorrc` file in JSON or YAML format
- `.envdoctorrc.json` file
- `.envdoctorrc.yaml`, `.envdoctorrc.yml`, or .`envdoctorrc.js` file
- `envdoctor.config.js` file exporting a JS object
- `envdoctor` filed in package.json

> If you are interested in demo project, let's check it out [example/](https://github.com/jukben/envdoctor/tree/master/example) folder.☝

Let's create .envdoctorrc.js and do simple configuration. We're going to use preset called **essentials**. Let's install the preset first.

```
yarn add @envdoctor/core @envdoctor/envdoctor-config-essentials
```

Once we have our dependencies satisfied we can write down the configuration

```js
const { COMPARATORS } = require("@envdoctor/envdoctor-config-essentials");

module.exports = {
  extends: ["@envdoctor/essentials"],
  rules: {
    "node-version": [2, { comparator: COMPARATORS.GT, version: "9" }],
    "yarn-version": [2, { comparator: COMPARATORS.GT, version: "1.12" }]
  }
};
```

## How it works

Every configuration has optional `extends` property and `rules` property. Valid configuration is thus JavaScript Object with `rules` or `extends` or both fields.

### extends

```ts
Array<string> | string | object
```

This filed is for extending configuration and loading their rules. Let's thing about this as about _preset_.

Has to be Array of strings or string, resolving into node_modules's package. It could be also JavaScript object (configuration).

If the of the package name is in the format:

- `envdoctor-config-name` you can extend it as `name`
- `@scope/envdoctor-config` you can extend it as `@scope`
- `@scope/envdoctor-config-name` you can extend it as `@scope/name`

### rules

```ts
[key: string]: Rule | IFunctionRule;
```

The rule is a heart of every configuration.

It's defined as key-value JavaScript object in a format `[severity, options, implementation]`

Every defined rule is automatically going to be checked. That means also rules you are extending from the extends. The rule name has to be unique in entire configuration. You can edit the rule definition on any level of the configuration, the more close to the root configuration you are the more weight the definition has.

#### severity

is suppose to be:

- `0` - turned off, `1` - warn, `2` - error
- `off` or `disabled`
- `on` or `enabled`
- `warn`
- `error`

#### options

is suppose to be whatever your function (rule) will play together.

#### implementation

As in the example above you don't always need to implement this as well, it could come from the _extends_ filed. If you are interested more. Here is how to [Create Rule](create-rule.md) guide.
