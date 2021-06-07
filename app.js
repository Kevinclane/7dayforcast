let weatherToken = "ba0369277f524ef783ebf22843d8f58e"

function toMPH(speed) {
  speed = Math.round(speed * 2.237)
  return speed
}

function toFahrenheit(temp) {
  temp = Math.round((temp * 9 / 5) + 32)
  return temp
}

//load inital page view
function init() {
  document.getElementById("app").innerHTML =
    `
    <div class="row">
      <h1 class="col-12 mt-4">7 Day Forecast</h1>
      <h4 class="col-12 my-4">Please enter a city</h4>
    </div>
    <form class="row" id="location-form" onsubmit="loadWeather(event)">
      <input class="col-6 offset-3 input-cstm" type="text" placeholder="city..." id="location">
      <div class="col-12">
        <button type="submit" class="btn mt-2">Submit</button>
      </div>
    </form>
  `
}

function generateDayWeather(data, day, date) {
  let windSpeed = toMPH(data.wind_spd)
  let high = toFahrenheit(data.high_temp)
  let low = toFahrenheit(data.low_temp)
  let template =
    `
  <span class="weather-card">
    <img class="icon" src="https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png" alt="weather icon"/>
    <div>${day}</div>
    <div>${date}</div>
    <div>High ${high}&deg;F</div>
    <div>Low ${low}&deg;F</div>
    <div>${data.weather.description}</div>
    <div>
    <span>
    <img class="wind" src="./assets/wind.png" alt="wind:" />
    </span>
    <span>
    ${windSpeed}mph
    </span>
    <span>
    ${data.wind_cdir}
    </span>
    </div>
  </span>
  `
  return template
}

function setupWeatherTemplate(location) {
  document.getElementById("app").innerHTML =
    `
    <div class="row">
      <h4 class="col-12">
        Check another location?
      </h4>
      <div class="col-12">
        <form class="row" id="location-form" onsubmit="loadWeather(event)">
          <input class="col-6 offset-3 input-cstm" type="text" placeholder="city..." id="location">
          <div class="col-12">
            <button type="submit" class="btn mt-2">Submit</button>
          </div>
        </form>
      </div>
      <div id="weather" class="col-12">
      <h3>
          Could not find data for ${location}. Check spelling or select a different city
        </h3>
      </div>
    </div>
  `
}


function loadWeather(event) {
  event.preventDefault()
  let location = event.target.location.value
  console.log(location)
  document.getElementById("app").innerHTML =
    `
        <img class="spinner" src="./assets/200.gif" alt="loading">
  `
  fetch('http://api.weatherbit.io/v2.0/forecast/daily?city=' + location + "&key=" + weatherToken + "&days=7", {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // "X-Auth-Token": weatherToken
    },
  }).then(response => response.json())
    .then(setupWeatherTemplate(location))
    .then(res => {
      if (!res.data) {
        document.getElementById("weather").innerHTML =
          `
        
        `
      } else {
        console.log(res)
        let template = `<div class="row d-flex justify-content-around mt-5">`
        let i = 0
        while (i < res.data.length) {
          let readableDate = dayjs(res.data[i].datetime).format("M/D/YY")
          let day = dayjs(res.data[i].datetime).format("ddd")
          template += generateDayWeather(res.data[i], day, readableDate)
          i++
        }
        template += `</div>`
        document.getElementById("weather").innerHTML = template
      }
    })
}

init()