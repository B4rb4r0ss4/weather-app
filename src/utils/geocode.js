const request = require('postman-request');
const geocode = (addres, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    addres
  )}.json?access_token=pk.eyJ1IjoiYmFyYmFyb3NzYWFjIiwiYSI6ImNrcW80emp5ZzBqMm0zMm1odTJmMm02ZzIifQ.56K-h_D9XL5iFbCIW_WB6w&limit=1`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search!', undefined);
    } else {
      callback(undefined, {
        longtitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
