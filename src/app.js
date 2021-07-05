const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('../src/utils/geocode');
const weather = require('../src/utils/weather');

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Barbarossa',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Barbarossa',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Barbarossa',
  });
});

app.get('/help/*', (req, res) => {
  res.render('error404', {
    title: 'Help article not found',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an adrress',
    });
  }

  geocode(
    req.query.address,
    (error, { location, latitude, longtitude } = {}) => {
      if (error) return res.send({ error: error });

      weather(latitude, longtitude, (error, forecastData) => {
        if (error) return console.log(error);

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.render('error404', {
    title: 'Error 404',
  });
});

app.listen(3000);
