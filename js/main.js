// select from html elemets
const search = document.querySelector('.location  input[type="text"]');
const findBtn = document.querySelector('.location input[type="button"]');
// all data inside one global array
let lastResult = [];
// event on search input
search.addEventListener("keyup", () => {
  let searchCity = search.value;
  getCity(searchCity);
});
// enent on findBtn 
findBtn.addEventListener("click", () => {
  let searchCity = search.value;
  getCity(searchCity);
});
// take data from weather API
async function getCity(searchCity) {
  const request = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b1b90436d338442b84f14440233012&q=${searchCity}&days=3`
  );
  lastResult = await request.json();
  //   let { name } = lastResult.location;
  //   let {temp_c} = lastResult.current
  //   let { icon } = lastResult.current.condition;
  //   let { forecastday } = lastResult.forecast;

  //   console.log(name);
  //   console.log(temp_c);
  //   console.log(icon);
  //   console.log(forecastday[0].date);
  display();
}
// call to draw our date when page loading 
getCity("cairo");

// to display data to our page 
function display() {
  // our date from API
  let { name } = lastResult.location;
  let { temp_c } = lastResult.current;
  let { text } = lastResult.current.condition;
  let { icon } = lastResult.current.condition;
  let { forecastday } = lastResult.forecast;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  blackBox = "";
  for (let i = 0; i < 3; i++) {
    let maxDegree = forecastday[i].day.maxtemp_c;
    let minDegree = forecastday[i].day.mintemp_c;
    let firstDay = `<span style="font-size:55px;">${temp_c}<sup>o</sup>C</span>`;
    let secondDegree = `
<span>${maxDegree}<sup>o</sup>C</span><br>
<span class="fs-6">${minDegree}<sup>o</sup>c</span>

`;
    const indexOfDay = new Date(forecastday[i].date).getDay();
    const dayNumber = new Date(forecastday[i].date).getDate();
    const indexOfMonth = new Date(forecastday[i].date).getMonth();
    blackBox += `
    <div class="col-md-4">
                
    <div>
    <div class="card">
        <div class="card-content">
                                <div class="card-title  mb-0 p-2   d-flex justify-content-between">
                                    <h5 class="fs-6">${days[indexOfDay]}</h5>
                                    <h5 class="fs-6">${dayNumber}-📅${
      months[indexOfMonth]
    }</h5>
                                    </div>
                                    <div class="card-body text-center ">
                                      <h6 class="card-subtitle mb-2 countryName mb-3">${name}</h6>
                                      <div class="card-text ">
                                          <p class="countryDegree fs-3">${
                                            i == 0 ? firstDay : secondDegree
                                          }</p>
                                          <p class="weather-icon fs-3">
                                            <img src="${
                                              i == 0
                                                ? icon
                                                : forecastday[i].day.condition
                                                    .icon
                                            }" alt="">
                                        </p>
                                      </div>
                                    </div>
                                    <div class="card-footer">
                                        <p class="condition text-info">${
                                          i == 0
                                            ? text
                                            : forecastday[i].day.condition.text
                                        }</p>
                                    <span>
                                    <img src="./images/icon-umberella.png" alt="" width="21px" class="ms-2">
                                            20%
                                    </span>
                                    <span>
                                        <img src="./images/icon-wind.png" alt="" width="21px" class="ms-2">
                                        18km/h
                                    </span>
                                    <span>
                                        <img src="./images/icon-compass.png" alt="" width="21px" class="ms-2">
                                        East
                                    </span>
                                    </div>
                                    
                            </div>
                            </div>
                            </div>
                            </div>
        `;
  }
  document.querySelector(".row").innerHTML = blackBox;
}
