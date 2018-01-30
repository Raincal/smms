# SMMS

[![Build Status](https://travis-ci.org/Raincal/smms.svg?branch=master)](https://travis-ci.org/Raincal/smms)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Dependency Status](https://gemnasium.com/badges/github.com/Raincal/smms.svg)](https://gemnasium.com/github.com/Raincal/smms)

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
