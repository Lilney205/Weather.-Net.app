document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53673e596e0aec82e3a6dbadce249c40&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }

            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
            document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;

            const cityImages = {
                'New York': 'newyork.jpg',
                'London': 'london.jpg',
                'Paris': 'paris.jpg',
                'Tokyo': 'tokyo.jpg',
                'Sydney': 'sydney.jpg'
            };

            if (cityImages[data.name]) {
                document.getElementById('city-image').src = cityImages[data.name];
            } else {
                document.getElementById('city-image').src = 'default.jpg';
            }

            document.querySelector('.weather-info').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
});
