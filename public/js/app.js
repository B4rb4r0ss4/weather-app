document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('.input').value;
  document.querySelector('.input').value = '';
  fetch(`http://localhost:3000/weather?address=${query}`).then(response => {
    try {
      response.json().then(data => {
        if (data.error) {
          return alert(data.error);
        }
        document.querySelector('.location').textContent =
          'Location: ' + data.location;

        document.querySelector('.weather-result').textContent =
          'Weather: ' + data.forecast;
      });
    } catch (error) {
      alert(error);
    }
  });
});
