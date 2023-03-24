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

  // Click event listener on search button
  getID("searchButton").addEventListener("click", function(event) {
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
    /*
    if (getID('dashHeading')){
      getID('dashHeading').parentNode.removeChild(getID('dashHeading'));
    } */
    
    console.log("Search Query: " + searchQuery);
    
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+searchQuery+"&limit=5&appid="+APIKey)
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
      let iconCode= globalWeatherStats.list[0].weather[0].icon;
      let weatherIcon= "https://openweathermap.org/img/wn/"+iconCode+"@2x.png";
      let addDash= getID('dashHeading');
        addDash.innerHTML=
        // City Name and current date - date formatted as per mock up
          "<h2>" +
          globalWeatherStats.city.name +
          globalSpacing +
          "("+date+")"+
          "</h2>" +
          // Temp / Wind/ Humidity
          "Temp: " +
          globalWeatherStats.list[0].main.temp+"°C <br>"+
          "Humidity: "+
          globalWeatherStats.list[0].main.humidity+"% <br>"+
          "Wind: "+
          globalWeatherStats.list[0].wind.speed+" KPH"
          ;
    // Weather Icon
    let appendTo = getID('dashHeading');
      let addIcon = document.createElement("img");
        addIcon.src=weatherIcon;
          appendTo.appendChild(addIcon);
 


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

    console.log("Area" + i +" Coordinates-- " + "Latitude:"+globalCoordinatesLat[i]+ " Longitude:"+ globalCoordinatesLon[i]);

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
  fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+z+"&lon="+y+"&appid="+APIKey+"&units=metric")
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



