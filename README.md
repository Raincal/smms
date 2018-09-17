# SMMS

[![Build Status](https://travis-ci.org/Raincal/smms.svg?branch=master)](https://travis-ci.org/Raincal/smms)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d9102fdae772dc0e75a/maintainability)](https://codeclimate.com/github/Raincal/smms/maintainability)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Development

### Installation

```bash
$ yarn
```

### Start

```bash
$ yarn start
```

### Build for production

```bash
$ yarn build
```

#### Configure nginx

```
location ^~/api/ {
    proxy_pass   https://sm.ms/api/;
}
```
