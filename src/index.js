let now = new Date();
let currentDay = document.querySelector("#current-day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
currentDay.innerHTML = `${day}<br />${date}<br />${month}`;

function displayTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let cityElement = document.querySelector("h1");
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#current-description");
  let currentEmoji = document.querySelector("#current-emoji");

  currentTemp.innerHTML = celsiusTemperature;
  cityElement.innerHTML = `${city}`;
  currentDescription.innerHTML = description;
  currentEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function citySelection(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#search-bar");
  let cityElement = document.querySelector("h1");
  searchCity(selectedCity.value);
}

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("submit", citySelection);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function navigate() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", navigate);

function switchToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = celsiusTemperature;
  celsius.classList.add("selected");
  fahrenheit.classList.remove("selected");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", switchToCelsius);

function switchToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  currentTemp.innerHTML = fahrenheitTemp;
  celsius.classList.remove("selected");
  fahrenheit.classList.add("selected");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", switchToFahrenheit);

let celsiusTemperature = null;

searchCity("London");
