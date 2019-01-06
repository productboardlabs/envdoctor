# @envdoctor/envdoctor-config-essentials

This configuration holds an essential check of version

### Utils

- Helper object defining possible comparators

```js
const { COMPARATORS } = require("@envdoctor/envdoctor-config-essentials");
```

Possible comparators:

- `COMPARATORS.EQ`
- `COMPARATORS.GT`
- `COMPARATORS.GTE`
- `COMPARATORS.LT`
- `COMPARATORS.LTE`
- `COMPARATORS.SATISFIES`

## Rules

### node-version

#### Configuration

```ts
interface INodeVersion {
  file?: string;
  comparator?: string;
  version?: string;
}
```

#### Usage

```js
{
  "node-version": [2, { comparator: COMPARATORS.GT, version: "9" ]
}
```

⚠️ There is also experimental API which takes the name of the file: `{ file: ".nvmrc"}` for instance. This will look for `.nvmrc` file for the version and then ensure that user uses the same major version.

### yarn-version

#### Configuration

```ts
interface INodeVersion {
  comparator?: string;
  version?: string;
}
```

#### Usage

```js
{
  "yarn-version": [2, { comparator: COMPARATORS.GT, version: "9" }]
}
```

## Install

`yarn add @envdoctor/core @envdoctor/envdoctor-config-essentials -D`

## Usage

In your `.envdoctorrc` file

```js
const { COMPARATORS } = require("@envdoctor/envdoctor-config-essentials");

module.exports = {
  extends: ["@envdoctor/essentials"],
  rules: {
    "node-version": [2, { comparator: COMPARATORS.GT, version: "9" }],
    "yarn-version": [2, { comparator: COMPARATORS.EQ, version: "1.12.3" }]
  }
};
```
