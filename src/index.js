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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
          <div>${formatDay(forecastDay.time)} </div>
          <img
            src= ${forecastDay.condition.icon_url}
            alt="weather-icon"
            width="40px"
          />
          <div class="forecast-temps">
            <span> ${Math.round(
              forecastDay.temperature.maximum
            )}° /</span> <span> ${Math.round(
          forecastDay.temperature.minimum
        )}° </span>
          </div>
        </div >`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "f30aff8e88d9o961t06a5249f250f1b6";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemp(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.temperature.current);
  let currentTemp = document.querySelector("#current-temp");
  let cityElement = document.querySelector("h1");
  let city = response.data.city;
  let description = response.data.condition.description;
  let currentDescription = document.querySelector("#current-description");
  let currentEmoji = document.querySelector("#current-emoji");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.temperature.humidity;
  let sunriseElement = document.querySelector("#rise-time");
  let sunsetElement = document.querySelector("#set-time");

  //let riseTime = new Date(response.data.sys.sunrise * 1000);
  //let riseHour = riseTime.getHours();
  //let riseMinutes = "0" + riseTime.getMinutes();
  //let setTime = new Date(response.data.sys.sunset * 1000);
  //let setHour = setTime.getHours();
  //let setMinutes = "0" + setTime.getMinutes();
  currentTemp.innerHTML = celsiusTemperature;
  cityElement.innerHTML = `${city}`;
  currentDescription.innerHTML = description;
  currentEmoji.setAttribute("src", response.data.condition.icon_url);
  windSpeedElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  // sunriseElement.innerHTML = `${riseHour}:${riseMinutes.substr(-2)}`;
  //sunsetElement.innerHTML = `${setHour}:${setMinutes.substr(-2)}`;
  getForecast(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f30aff8e88d9o961t06a5249f250f1b6";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiURL).then(displayTemp);
}

function searchCity(city) {
  let apiKey = "f30aff8e88d9o961t06a5249f250f1b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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
