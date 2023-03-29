/*
Built-in API request by city name - 
!!!!!! [THIS IS DEPRECATED, BY THE LOOK OF THE GRADING PAGE, THEY WANT US TO CONVERT A CITY SEARCH
INTO COORDINATES AND PASS THAT ACROSS TO THE API INSTEAD]

You can search weather forecast for 5 days with data every 3 hours by city name. All weather data can be obtained in JSON and XML formats.

API call
api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}
api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}

!!!!! [THIS GETS US COORDINATES BY LOCATION NAME FOR PASSING TO THE API]
Coordinates by location name
How to make an API call

API call
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
Parameters
q 	required 	City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
appid 	required 	Your unique API key (you can always find it on your account page under the "API key" tab)
limit 	optional 	Number of the locations in the API response (up to 5 results can be returned in the API response)

Example of API call
http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}


You can search weather forecast for 5 days with data every 3 hours by geographic coordinates. All weather data can be obtained in JSON and XML formats.

How to make an API call

API call
api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} 

*/

let APIKey= "15f30b5439aba93a71279745353860e6";
let globalObjectStorage = [];
let globalCountries = [];
let globalCities = [];
let globalStates= [];
let globalCoordinatesLat= [];
let globalCoordinatesLon= [];
let globalSpacing = '&nbsp&nbsp&nbsp&nbsp'
let searchConfirmationBoxes = ['box1','box2','box3','box4','box5']
let globalWeatherStats = [];
// Also used as ID's
let globalSearchHistoryKeys = ['search1','search2','search3','search4','search5'];

// copy locally stored strings from history, into history drop down menu
for (let i = 0; i < 5; i++) {
  let search = getID(globalSearchHistoryKeys[i]);
  let removeChar;
  if (localStorage.getItem(globalSearchHistoryKeys[i])!=null) {
    removeChar = localStorage.getItem(globalSearchHistoryKeys[i]).replace(/['"]+/g, '');
  }
  else removeChar = null;
   search.innerText= removeChar;
    }

  // Click event listener on search history items
  // pass the search function the text from history drop down
  for (let i = 0; i < 5; i++) {
      search = getID(globalSearchHistoryKeys[i]);
        search.addEventListener("click", function(event) {
          // Passing history search straight to main search function
          clickedSearch(localStorage.getItem(globalSearchHistoryKeys[i]));
          /*
          //Passing history text into search box
          getID("searchTextEntry").value = localStorage.getItem(globalSearchHistoryKeys[i]).replace(/['"]+/g, '');
          */
        })
      }

  // Click event listener on search button
  getID("searchButton").addEventListener("click", function(event) {
  // store search in history
  for (let i = 0; i < 5; i++) {
    if (localStorage.getItem(globalSearchHistoryKeys[i])==null){
    localStorage.setItem(globalSearchHistoryKeys[i], JSON.stringify(getID("searchTextEntry").value));
    break;
    }
  }
  // call main function, pass it the search query
  clickedSearch(getID("searchTextEntry").value);
})

function clickedSearch(searchQuery) {
    
    // for multiple searches, remove the old search options stuff and reset query boolean
    if (getID('possibleMatchesID')) {
      getID('possibleMatchesID').parentNode.removeChild(getID('possibleMatchesID'));
      }
    if (getClass("possibleMatchesClass")){
      for (let i = 0; i < 5; i++) {
        getID(searchConfirmationBoxes[i]).parentNode.removeChild(getID(searchConfirmationBoxes[i]));
      }
    }
    
    console.log("Search Query: " + searchQuery);
    
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+searchQuery+"&limit=5&appid="+APIKey)
      .then(response => response.json())
        .then(data => toObject(data))
}

// this takes the returned fetch data (search confirmation) and stores it as an object variable so we can
// use this data in the application, some element creation is placed here due to requiring the information
// from variables created in this section
let toWeatherStats= (data) => {
  globalWeatherStats = data;
  console.log("Weather Info now stored as object, format as follows: ");
  console.log(globalWeatherStats);

      /* Roll out the dash elements
      https://openweathermap.org/weather-conditions
      How to get icon URL
      For code 500 - light rain icon = "10d". See below a full list of codes
      URL is https://openweathermap.org/img/wn/10d@2x.png                     
      */
      const date = new Date().toLocaleDateString();
      let slicedForecastDay;
      // Day of month (string)
      let currentDay = date.slice(0,2);
      // unary conversion to number
      currentDay= +currentDay;
      // hour of day/s in forecasts, converted to a number below
      let slicedForecastHour;
      // day JS hour of day
      let currentHour = dayjs().hour();
      // most current index of forecast/s storage, ignore prior
      let forecastIndex;

      // Fetch the most recent weather update for the top of the weather dash results
      // 8 iterations max for 8*3 being 24 hours (3 hour updates)
      for (let i = 0; i<8; i++) {
        // slice the forecast hour
        slicedForecastHour= globalWeatherStats.list[i].dt_txt.slice(10);
          slicedForecastHour= slicedForecastHour.slice(1,3);
              // convert sliced forecast hour of day to a number with unary plus operator
              slicedForecastDay = +slicedForecastHour;
                // slice the forecast day/s and convert to a number for comparison against current day
                slicedForecastDay = globalWeatherStats.list[i].dt_txt.slice(8);
                  slicedForecastDay = slicedForecastDay.slice(0,3);
                    slicedForecastDay = +slicedForecastDay;
                      // so we can see which element the loop breaks on (for testing)
                      forecastIndex = i;
              // check if it is the same hour of day OR the next closest forecast update
              // this is what we want to display as the current forecast for our search
              if (slicedForecastHour>currentHour && slicedForecastDay===currentDay || slicedForecastHour==currentHour && slicedForecastDay===currentDay){
                console.log ("Forecast Day: "+slicedForecastDay);
                console.log ("Current Day: "+currentDay);
                console.log ("Current Hour: "+ currentHour);
                console.log ("ForeCast Hour: "+slicedForecastHour);
                break;
                }
              }
            
      console.log("Current Weather Element:"+forecastIndex);

      let iconCode= globalWeatherStats.list[forecastIndex].weather[0].icon;
      let iconAltText = globalWeatherStats.list[forecastIndex].weather[0].description;
      let weatherIcon= "https://openweathermap.org/img/wn/"+iconCode+"@2x.png";

      let addDash= getID('dashHeading');
        addDash.innerHTML=
        // City Name and current date - date formatted as per mock up
          "<h2>" +
          globalWeatherStats.city.name +
          "&nbsp" +
          "("+date+")"+
          "</h2>" +
          // Temp / Wind/ Humidity
          "Temp: " +
          globalWeatherStats.list[forecastIndex].main.temp+"°C <br>"+
          "Humidity: "+
          globalWeatherStats.list[forecastIndex].main.humidity+"% <br>"+
          "Wind: "+
          globalWeatherStats.list[forecastIndex].wind.speed+" KPH"
          ;
    // Weather Icon
    let appendTo = document.querySelector('h2');
      let addIcon = document.createElement("img");
        addIcon.src=weatherIcon;
          addIcon.setAttribute("alt",iconAltText);
            appendTo.appendChild(addIcon);
            
  // future 5 day forecast
  /* General Algorithm 
  1: Grab the current day of month first for comparison to forecast object elements.
  element 0 of weather forecast object is NOT necessarily the current day, i.e. it just changed from lastnights 9pm 
  forecast to the current days midnight forecast just now before 6am.
  
  2: Move forward in the array until date changes, grab the next array element and move it into it's own 
    variable, rinse repeat until we have 5 future day forecasts all stored in separate variables for processing */
    //let slicedForecastDay; -> moved
    //let currentDay = date.slice(0,2); -> moved 
    let futureForecast = [];
    let y =0;
    for (let i = forecastIndex; i<40-forecastIndex; i++) {
      slicedForecastDay = globalWeatherStats.list[i].dt_txt.slice(8);
        slicedForecastDay = slicedForecastDay.slice(0,3);
            // if the elements day is not todays day, tell us which element that is
            // and update the current day variable to the next day, rinse repeat
              if (slicedForecastDay!=currentDay){
                console.log("Array Elements Required: " + i);
                  currentDay = slicedForecastDay;
                  // below i is == midnight
                  // +1 == 3am, +2 == 6am, +3 == 9am, +4 == midday etc.
                  futureForecast[y] =globalWeatherStats.list[i+4];
                  y++;
                }
              }
              console.log(futureForecast);

    // create forecast boxes, moved from HTML to on the fly creation in JS so we didn't have empty blue boxes existing
    // pior to search. check if forecast already exists each click for multiple queries and remove old boxes before updating
    for (let i= 0; i < 4; i++) {
      let r = getClass('forecast');
        if (r) r.parentNode.removeChild(r);
        }
        let forecastBoxes = ['forecastBox1','forecastBox2','forecastBox3','forecastBox4'];
        for (let i= 0; i< forecastBoxes.length; i++) {
          let createforecastBoxes= document.createElement("div");
            let appendTo = getClass('dashContainer5Day');
              createforecastBoxes.className= "forecast";
                createforecastBoxes.id= forecastBoxes[i];
                  appendTo.appendChild(createforecastBoxes);
        }
    
    // roll out the next 4 day forecasts, element/s already exist, we just need to populate them with the data 
    // we stored in 'futureForecast'
      for (let i = 0; i< 4; i++) {
        iconCode= futureForecast[i].weather[0].icon;
          iconAltText = futureForecast[i].weather[0].description.replace(/ /g, "_");;
            weatherIcon= "https://openweathermap.org/img/wn/"+iconCode+"@2x.png";
              let forecastData = getID(forecastBoxes[i]);

        forecastData.innerHTML= 
        futureForecast[i].dt_txt + "<br> <br>" +
        "<img src="+ weatherIcon +" alt=" + iconAltText + " <br> <br>" +
        "Temp: " + futureForecast[i].main.temp + "°C <br>" +
        "Humidity: " + futureForecast[i].main.humidity+"% <br>"+
        "Wind: " + futureForecast[i].wind.speed + "KPH";
    }
}

// this takes the returned fetch data (initial search) and stores it as an object variable so we can use this data
// in the application, it also sets up the search options inner text, element creation is placed here
// because it allows the variable containing the fetched object to exist first. A lot of logic is placed
// here for the same reason
let toObject = (data) => {
  globalObjectStorage = data;
  console.log(globalObjectStorage);

// create possible matches element for search confirmation, append to search container area
// globalObjectStorage length check is to ensure a dud search doesn't create the search options element/s
if (globalObjectStorage.length > 0) {
  for (let i = 0; i < 5; i++) {
    let y= document.createElement("div");
      y.className= "possibleMatchesClass";
        y.id=searchConfirmationBoxes[i];
          getClass("searchAreaContainer").appendChild(y);
          }
  // extract/ format the information we need from fetched object
  // globalObjectStorage.length is == fetches "&limit=X", default X= 5
  for (let i = 0; i < globalObjectStorage.length; i++) {
    globalCountries[i]= globalObjectStorage[i].country;
      globalCities[i]= globalObjectStorage[i].name;
        globalStates[i]= globalObjectStorage[i].state;
          globalCoordinatesLat[i]= globalObjectStorage[i].lat;
            globalCoordinatesLon[i]=globalObjectStorage[i].lon;

    getID(searchConfirmationBoxes[i]).innerHTML= 
    "Country: "+ globalCountries[i] +
    globalSpacing +
   "City: "+ globalCities[i] +
    globalSpacing +
   "State: "+ globalStates[i] +
    "<br>";
      }
   }
        // Click event listener on search options IF a valid search was performed
        // the co-ordinates for ALL 5 options are already stored in an array
        // just need to choose one, depending on which is clicked, and send the corresponding API query
        // long winded switch statement otherwise we either send 5 queries or can only send one query per page load
        if (getClass('possibleMatchesClass')){
        for (let i = 0; i < 5; i++) {
          getID(searchConfirmationBoxes[i]).addEventListener("click", function(event) {
            id = event.target.id;
              switch (id) {
                case "box1":
                 console.log("query element 0 clicked");
                 searchOptionQuery(globalCoordinatesLat[0],globalCoordinatesLon[0]);
                  break;
                case "box2":
                  console.log("query element 1 clicked");
                  searchOptionQuery(globalCoordinatesLat[1],globalCoordinatesLon[1]);
                  break;
                case "box3":
                  console.log("query element 2 clicked");
                  searchOptionQuery(globalCoordinatesLat[2],globalCoordinatesLon[2]);
                  break;
                case "box4":
                  console.log("query element 3 clicked");
                  searchOptionQuery(globalCoordinatesLat[3],globalCoordinatesLon[3]);
                  break;
                case "box5":
                  console.log("query element 4 clicked");
                  searchOptionQuery(globalCoordinatesLat[4],globalCoordinatesLon[4]);
                break;
              }
            });
          }
        }
}

function searchOptionQuery(z,y){
  fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+z+"&lon="+y+"&appid="+APIKey+"&units=metric")
  .then(response => response.json())
    .then(data => toWeatherStats(data));
}

// just functions where the syntax for common calls is modified to my own liking
function getID(ID){
  return document.getElementById(ID);
}
function getClass(className){
  return document.querySelector("."+className);
}



