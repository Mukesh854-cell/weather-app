const searchInput = document.querySelector('.input-box');
const searchBtn = document.querySelector('.search');
const locationBtn = document.querySelector('.current-location');
const displayArea = document.querySelector('.display-area');

const apiKey = "53944d50030269f361a14f66092437e0";

async function getWeather(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let data = await response.json();

    console.log(data);
}

searchBtn.addEventListener('click', () => {
    let city = searchInput.value;
    getWeather(city);
})