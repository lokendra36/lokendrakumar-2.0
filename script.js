const API_KEY = '219e6d1471ef449b87c170656252102';
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const tempElement = document.getElementById('temp');
const cityElement = document.getElementById('city');
const conditionElement = document.getElementById('condition');
const weatherIcon = document.getElementById('weatherIcon');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');

// Event Listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Get weather data
async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no`);
        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }

        updateUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Update UI with weather data
function updateUI(data) {
    const { current, location } = data;

    // Update main weather information
    tempElement.textContent = current.temp_c;
    cityElement.textContent = `${location.name}, ${location.country}`;
    conditionElement.textContent = current.condition.text;
    weatherIcon.src = current.condition.icon;

    // Update additional information
    windElement.textContent = `${current.wind_kph} km/h`;
    humidityElement.textContent = `${current.humidity}%`;
    pressureElement.textContent = `${current.pressure_mb} mb`;
}

// Get weather for default city (London) on page load
window.addEventListener('load', () => {
    cityInput.value = 'London';
    getWeather();
}); 