async function citySearched() {
  const APIKEY = "c5f4972ce8ae6b83da35dbc3c789f3ce";
  const cityName = $(".cities-input").val();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`
  );
  
  const weather = await response.json();
  const weatherForcast = [];
  function ktof(kelvin) {
    fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
    return Math.floor(fahrenheit);
  }
  for (let i = 0; i < weather.list.length; i += 8) {
    weatherForcast.push(weather.list[i]);
  }

  console.log(weatherForcast);

  const currentTemp = weatherForcast[0].main.temp;
  const currenthumidity = weatherForcast[0].main.humidity;
  const currentWindspeed = weatherForcast[0].wind.speed;

  $("#city-name").text(weather.city.name);
  $("#city-date").text(weather.list[0].dt_txt.split(" ")[0]);
  $("#current-wind").text(currentWindspeed);
  $("#current-humid").text(currenthumidity);

  $("#current-temp").text(ktof(currentTemp));
  $(".forcast-container").html(``);
  weatherForcast.forEach((item) => {
    return $(".forcast-container").append(` <div class="forcast-box">
 <div class="forcast-city">
  
   <p>${item.dt_txt.split(" ")[0]}</p>
 </div>
 <div class="temperature forcast-temp">
   <p>Temp:</p>
   <p class="temperature">${ktof(item.main.temp)}</p>
   <p>F</p>
 </div>
 <div class="temperature forcast-temp">
   <p>Wind:</p>
   <p class="temperature">${item.wind.speed}</p>
   <p>MPH</p>
 </div>
 <div class="temperature forcast-temp">
   <p>humidity:</p>
   <p class="temperature">${item.main.humidity}</p>
   <p>%</p>
 </div>
</div>`);
  });
}

$(".cities-submit").on("click", citySearched);
