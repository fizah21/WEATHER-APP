
async function getWeather() {

    let city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    try {

        // Find city location
        let locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        let locationData = await locationResponse.json();

        if (!locationData.results) {
            alert("City not found!");
            return;
        }

        let latitude = locationData.results[0].latitude;
        let longitude = locationData.results[0].longitude;
        let cityName = locationData.results[0].name;

        // Get weather data
        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );

        let weatherData = await weatherResponse.json();

        let current = weatherData.current;

        // Display data
        document.getElementById("cityName").innerText = cityName;

        document.getElementById("temperature").innerText =
            current.temperature_2m + " °C";

        document.getElementById("humidity").innerText =
            "Humidity: " + current.relative_humidity_2m + "%";

        document.getElementById("wind").innerText =
            "Wind Speed: " + current.wind_speed_10m + " km/h";

        let code = current.weather_code;

        let condition = "Cloudy";

        if (code === 0) {
            condition = "Clear Sky ☀️";
        } else if (code <= 3) {
            condition = "Partly Cloudy 🌤️";
        } else if (code <= 48) {
            condition = "Foggy 🌫️";
        } else if (code <= 67) {
            condition = "Rainy 🌧️";
        } else if (code <= 77) {
            condition = "Snowy ❄️";
        } else if (code <= 82) {
            condition = "Rain Showers 🌧️";
        } else if (code >= 95) {
            condition = "Thunderstorm ⛈️";
        }

        document.getElementById("condition").innerText = condition;

    } catch (error) {
        alert("Something went wrong. Please try again!");
        console.log(error);
    }
}
