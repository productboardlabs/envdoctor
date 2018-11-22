# @envdoctor/utils

Common utils for Envdoctor

## Install

`yarn add @envdoctor/core @envdoctor/utils -D`

- exec (which is re-exported https://github.com/sindresorhus/execa)

```js
const execa = require("execa");

(async () => {
  const { stdout } = await execa("echo", ["unicorns"]);
  console.log(stdout);
  //=> 'unicorns'
})();
```

- semver (which is re-exported https://github.com/npm/node-semver)

```js
const semver = require("semver");

semver.valid("1.2.3"); // '1.2.3'
semver.valid("a.b.c"); // null
semver.clean("  =v1.2.3   "); // '1.2.3'
semver.satisfies("1.2.3", "1.x || >=2.5.0 || 5.0.0 - 7.2.3"); // true
semver.gt("1.2.3", "9.8.7"); // false
semver.lt("1.2.3", "9.8.7"); // true
semver.valid(semver.coerce("v2")); // '2.0.0'
semver.valid(semver.coerce("42.6.7.9.3-alpha")); // '42.6.7'
```
