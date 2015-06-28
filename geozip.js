'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GeoZip = (function () {
  function GeoZip() {
    _classCallCheck(this, GeoZip);
  }

  _createClass(GeoZip, [{
    key: 'encode',
    value: function encode(lat, lng) {
      var validate = arguments[2] === undefined ? false : arguments[2];
      var precision = arguments[3] === undefined ? null : arguments[3];

      if (precision) {
        var res = this._fixPrecision(lat, lng, precision);
        lat = res.lat;
        lng = res.lng;
      }
      if (validate) this.validate(lat, lng);
      var shiftedLat = lat + 90;
      var shiftedLng = lng + 180;
      var latParts = (shiftedLat + '').split('.');
      var lngParts = (shiftedLng + '').split('.');
      latParts[0] = this._zeroPad(latParts[0], 3);
      lngParts[0] = this._zeroPad(lngParts[0], 3);
      var latResult = latParts.join('');
      var lngResult = lngParts.join('');
      return this._zip(latResult, lngResult);
    }
  }, {
    key: 'decode',
    value: function decode(geozip) {
      var strGeozip = geozip + '';
      var lengthIsOdd = strGeozip.length % 2;
      if (lengthIsOdd) {
        strGeozip = '0' + strGeozip;
      }
      var unzipped = this._unzip(strGeozip);
      return {
        lat: unzipped.lat - 90,
        lng: unzipped.lng - 180
      };
    }
  }, {
    key: 'validate',
    value: function validate(lat, lng) {
      if (lat <= -90 || lat >= 90) {
        throw new Error('The latitude should be a number between -90 and 90.');
      }
      if (lng <= -180 || lng >= 180) {
        throw new Error('The longitude should be a number between -180 and 180.');
      }
      var latParts = (lat + '').split('.');
      var lngParts = (lng + '').split('.');
      if (latParts.length !== lngParts.length) {
        throw new Error('The latitude and longitude should both either have decimal digits or not have them.');
      }
      var checkIndex = latParts.length === 1 ? 0 : 1;
      if (latParts[checkIndex].length !== lngParts[checkIndex].length) {
        throw new Error('The latitude and longitude should have the same amount of decimal digits');
      }
    }
  }, {
    key: '_fixPrecision',
    value: function _fixPrecision(lat, lng, precision) {
      var numbersAfterComma = (precision - 6) / 2;
      var latIntegerNumbers = Math.abs(lat).toFixed().length;
      var lngIntegerNumbers = Math.abs(lng).toFixed().length;
      return {
        lat: Number(lat.toPrecision(latIntegerNumbers + numbersAfterComma)),
        lng: Number(lng.toPrecision(lngIntegerNumbers + numbersAfterComma))
      };
    }
  }, {
    key: '_zip',
    value: function _zip(lat, lng) {
      var result = '';
      var i = 0;
      while (lat.charAt(i) !== '') {
        result += lat.charAt(i);
        result += lng.charAt(i);
        i++;
      }
      return result;
    }
  }, {
    key: '_unzip',
    value: function _unzip(geozip) {
      var latStr = '';
      var lngStr = '';
      var i = 0;
      while (geozip.charAt(i) !== '') {
        if (i % 2) {
          lngStr += geozip.charAt(i);
          if (i === 5) {
            lngStr += '.';
          }
        } else {
          latStr += geozip.charAt(i);
          if (i === 4) {
            latStr += '.';
          }
        }
        i++;
      }
      return {
        lat: Number(latStr),
        lng: Number(lngStr)
      };
    }
  }, {
    key: '_zeroPad',
    value: function _zeroPad(num, width) {
      num = num + '';
      return num.length >= width ? num : new Array(width - num.length + 1).join('0') + num;
    }
  }]);

  return GeoZip;
})();

exports['default'] = GeoZip;
module.exports = exports['default'];

