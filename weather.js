//api details
const apiKey = "ccdb0c9cbd4d654df3c396354d92e511";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".card");

//weather api
async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  //return error message if status is 404
  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }else{
    //start retrieving data from api json
    var data = await response.json();

    console.log(data)

    document.querySelector(".city").innerHTML = data.name;
    // document.querySelector(".country").innerHTML = data.sys.country;
    document.querySelector(".weather-condition").innerHTML = data.weather[0].main;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    //change image depending on weather
    if(data.weather[0].main === "Clouds"){
      weatherIcon.innerHTML = "<i class='fas fa-cloud-sun'></i>";
      weatherCard.style.background = "linear-gradient(135deg, var(--weather-color-light-clouds), var(--weather-color-dark-clouds))";
    }
    else if(data.weather[0].main === "Clear"){
      weatherIcon.innerHTML = "<i class='fas fa-sun'></i>";
      weatherCard.style.background = "linear-gradient(135deg, var(--weather-color-light), var(--weather-color-dark))";
    }
    else if(data.weather[0].main === "Rain"){
      weatherIcon.innerHTML = "<i class='fas fa-cloud-showers-heavy'></i>";
      weatherCard.style.background = "linear-gradient(135deg, var(--weather-color-light-rain), var(--weather-color-dark-rain))";
    }
    else if(data.weather[0].main === "Drizzle"){
      weatherIcon.innerHTML = "<i class='fas fa-cloud-rain'></i>";
      weatherCard.style.background = "linear-gradient(135deg, var(--weather-color-light-rain), var(--weather-color-dark-rain))";
    }
    else if(data.weather[0].main == "Mist"){
      weatherIcon.innerHTML = "<i class='fas fa-smog'></i>";
      weatherCard.style.background = "linear-gradient(135deg, var(--weather-color-light-rain), var(--weather-color-dark-rain))";
    }

    //display weather container
    document.querySelector(".weather").style.display = "block";

    //hide error message
    document.querySelector(".error").style.display = "none";
  }
}

//search button clicked call checkWeather function with city name
searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})

//enter key pressed call checkWeather function with city name
searchBox.addEventListener("keypress", ()=>{
  if(event.key === "Enter") {
    event.preventDefault();
    checkWeather(searchBox.value);
  }
})