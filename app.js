function init() {
  document.getElementById("app").innerHTML =
    `
    <div class="row">
      <h1 class="col-12 mt-4">7 Day Forecast</h1>
      <h4 class="col-12 my-4">Please enter your location</h4>
    </div>
    <form class="row" id="location-form" onsubmit="loadWeather(event)">
      <input class="col-6 offset-3 input-cstm" type="text" placeholder="location..." id="location">
      <div class="col-12">
        <button type="submit" class="btn mt-2">Submit</button>
      </div>
    </form>
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
  fetch
}

init()