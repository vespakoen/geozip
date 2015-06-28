# geozip

A geozip implementation for node and the browser.

As described here: http://geozipcode.blogspot.nl/2015/02/geozip.html

## Installation

```shell
npm install --save geozip
```


## Usage

```js
var GeoZip = require('geozip');
var zipper = new GeoZip();

// standard usage
var encoded = zipper.encode(-34.783467, 128.294109);
var decoded = zipper.decode(encoded);
console.log(encoded);
console.log(decoded);

// validate input
var encoded = zipper.encode(-34.783467, 128.294, true); // throws error, coordinates do not have the same precision

// auto-fix precision
var encoded = zipper.encode(-34.783467, 128.294, true, 18); // no more errors
```

## Api

#### encode(lat, lng, validate = false, precision = 18)
returns a geohash

#### decode(geozip)
returns an object containing a "lat" and "lng" property

## License

MIT
