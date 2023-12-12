let weather = {
  apiKey: "#Enter Your API Key From WeatherAPI.com", //Weather API key
  fetchWeather: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&units=metric"
    )
      .then((response) => {
        if (!response.ok) {
          alert("Looks like weather is not good to give input... :)");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.log("Error fetching weather:", error);
      });
  },
  displayWeather: function (data) {
  const { name } = data;
  if (data.current && data.current.condition) {
    const { icon, text: description } = data.current.condition;
    const { temp_c: temp, humidity } = data.current;
    const { wind_kph: speed } = data.current;
    document.querySelector(".icon").src =
      "https://cdn.weatherapi.com/weather/64x64/day/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  } else {
    console.log("No weather data found.");
    
  }
},

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".search button")
  .addEventListener("click", function () {
    weather.search();
  });

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});
