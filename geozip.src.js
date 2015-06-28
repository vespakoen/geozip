class GeoZip {

  encode(lat, lng, validate = false, precision = 18) {
    if (validate) this.validate(lat, lng);
    var shiftedLat = lat + 90;
    var shiftedLng = lng + 180;
    var res = this._fixPrecision(shiftedLat, shiftedLng, precision);
    shiftedLat = res.lat;
    shiftedLng = res.lng;
    var latParts = shiftedLat.split('.');
    var lngParts = shiftedLng.split('.');
    latParts[0] = this._zeroPad(latParts[0], 3);
    lngParts[0] = this._zeroPad(lngParts[0], 3);
    var latResult = latParts.join('');
    var lngResult = lngParts.join('');
    return this._zip(latResult, lngResult)
  }

  decode(geozip) {
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

  validate(lat, lng) {
    if (lat <= -90 || lat >= 90) {
      throw new Error('The latitude should be a number between -90 and 90.');
    }
    if (lng <= -180 || lng >= 180) {
      throw new Error('The longitude should be a number between -180 and 180.');
    }
  }

  _fixPrecision(lat, lng, precision) {
    var numbersAfterComma = (precision - 6) / 2;
    var latIntegerNumbers = Math.abs(lat).toFixed().length;
    var lngIntegerNumbers = Math.abs(lng).toFixed().length;
    return {
      lat: lat.toPrecision(latIntegerNumbers + numbersAfterComma),
      lng: lng.toPrecision(lngIntegerNumbers + numbersAfterComma)
    };
  }

  _zip(lat, lng) {
    var result = '';
    var i = 0;
    while (lat.charAt(i) !== '') {
      result += lat.charAt(i);
      result += lng.charAt(i);
      i++;
    }
    return result;
  }

  _unzip(geozip) {
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

  _zeroPad(num, width) {
    num = num + '';
    return num.length >= width ? num : new Array(width - num.length + 1).join('0') + num;
  }

}

export default GeoZip;
