# envdoctor-config-essentials

This is example configuration for envdoctor framework

## Rules

- yarn_version (version: string)
- node_version (version: string)

## Install

`yarn add envdoctor envdoctor-config-essentials -D`

## Usage

In your `.doctorrc` file

```
{
  "extends": ["essentials"],
  "rules": {
    "yarn-version": [2, "1.9.0"],
    "node-version": [2, "v8"],
  }
}
```
