const searchInput = document.querySelector('.input-box');
const searchBtn = document.querySelector('.search-btn');
const locationBtn = document.querySelector('.location-btn');
const displayArea = document.querySelector('.display-area');

const apiKey = "53944d50030269f361a14f66092437e0";

async function getWeather(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let data = await response.json();

    console.log(data);

    displayArea.innerHTML = `
    <div class="weather-data">
        <h2>${data.name}, ${data.sys.country}</h2>
        <h1>${Math.round(data.main.temp)}°C</h1>
        <p>${data.weather[0].description}</p>
        <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
    </div>
    `;
}

searchBtn.addEventListener('click', () => {
    let city = searchInput.value;
    getWeather(city);
})