# SMMS

[![Build Status](https://travis-ci.org/Raincal/smms.svg?branch=master)](https://travis-ci.org/Raincal/smms)
[![Dependency Status](https://gemnasium.com/badges/github.com/Raincal/smms.svg)](https://gemnasium.com/github.com/Raincal/smms)

## Development

### Installation

```bash
$ yarn
```

### Start

```bash
$ npm start
```

### Build for production

```bash
$ npm run build
```

#### Configure nginx
```
location ^~/api/ {
    proxy_pass   https://sm.ms/api/;
}
```
