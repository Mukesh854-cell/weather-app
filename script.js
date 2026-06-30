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
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <p class="condition">${data.weather[0].description}</p>
        <div class="details"> 
            <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
        </div>
    </div>
    `;
}

async function getForecast(city) {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    let data = await response.json();

    const dailyForecasts = data.list.filter((item) => {
        return item.dt_txt.includes("09:00:00") ||
            item.dt_txt.includes("15:00:00") ||
            item.dt_txt.includes("21:00:00");
    });

    const groupedByDay = {};

    dailyForecasts.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!groupedByDay[date]) {
            groupedByDay[date] = [];
        }

        groupedByDay[date].push(item);
    });

    console.log(groupedByDay);

    const forecastSection = document.getElementById('forecastSection');
    forecastSection.innerHTML = '';

    Object.keys(groupedByDay).forEach((date) => {
        const dayEntries = groupedByDay[date];
        const dayDate = new Date(date);
        const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });

        const card = document.createElement('div');
        card.className = 'forecast-card';

        let timesHTML = '';
        dayEntries.forEach((entry) => {
            const time = entry.dt_txt.split(" ")[1].slice(0, 5);
            const condition = entry.weather[0].main;
            timesHTML += `<p>${time} - ${Math.round(entry.main.temp)}°C - ${condition}</p>`;
        });

        card.innerHTML = `
        <p class="day-name">${dayName}</p>
        ${timesHTML}
    `;

        forecastSection.appendChild(card);
    });

    console.log(dailyForecasts);
}

searchBtn.addEventListener('click', () => {
    let city = searchInput.value;
    getWeather(city);
    getForecast(city);
});

locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeatherByCoords(lat, lon);
    });
});

async function getWeatherByCoords(lat, lon) {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    let data = await response.json();

    console.log(data);

    displayArea.innerHTML = `
        <div class="weather-data">
            <h2>${data.name}, ${data.sys.country}</h2>
            <div class="temp">${Math.round(data.main.temp)}°C</div>
            <p class="condition">${data.weather[0].description}</p>
            <div class="details">
                <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
                <p>Pressure: ${data.main.pressure} hPa</p>
            </div>
        </div>
    `;
};