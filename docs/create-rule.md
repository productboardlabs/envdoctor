---
id: create-rule
title: Create Rule
---

## Introduction

Creation of the rule is almost that simple as a configuration of rules extended from some preset, all you need to do is to define also third (implementation) index in the array.

## Signature

```ts
interface IFunctionRule {
  (parameters: any): boolean | string;
  description?: string | ((any) => string);
}

[boolean | number | string, any?, IFunctionRule?];
```

## Example

```js
function ownRuleImplementation(arg) {
  return "Failed Hello " + arg;
}

ownRuleImplementation.description = "This is just example";
```

> static `description` field could be also a function to get the same arguments as the rule itself. Could be convenient for generic messages.

When we put everything together we will get something like this:

```js
rules {
 "own-rule": [2, "World", ownRuleImplementation],
 ...
}
```

In real world this rule always fails (with an error!) because we are returning string in the implementation. If we want to "pass" the check, let's return anything else instead. Returned string is going to be used as "reason to fail" the current rule.
