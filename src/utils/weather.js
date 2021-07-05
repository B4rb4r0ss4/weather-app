const request = require('postman-request');

const weather = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3bb2958b706c31fa2b10a759c91d1bd3&query=${latitude},${longtitude}`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to the weather service!', undefined);
    } else if (body.success === false) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degress out. Wind speed: ${body.current.wind_speed} km/h. Pressure: ${body.current.pressure} hPa`
      );
    }
  });
};

module.exports = weather;
