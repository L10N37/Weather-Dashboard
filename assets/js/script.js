/*
Built-in API request by city name

You can search weather forecast for 5 days with data every 3 hours by city name. All weather data can be obtained in JSON and XML formats.

API call
api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}
api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}


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

*/

let APIKey= "15f30b5439aba93a71279745353860e6";
let globalObjectStorage = [];
let globalCountries = [];
let globalCities = [];
let globalSpacing = '&nbsp&nbsp&nbsp&nbsp'
let searchConfirmationBoxes = ['box1','box2','box3','box4','box5']

function clickedSearch(searchQuery) {
    
    // for multiple searches, remove the old search options stuff
    if (getID('possibleMatchesID')) {
      getID('possibleMatchesID').parentNode.removeChild(getID('possibleMatchesID'));
    }
    if (getClass("possibleMatchesClass")){
      for (let i = 0; i < 5; i++) {
        getID(searchConfirmationBoxes[i]).parentNode.removeChild(getID(searchConfirmationBoxes[i]));
      }
    }
    
  
    console.log("Search Query: " + searchQuery);
    
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+searchQuery+"&limit=5&appid="+APIKey)
      .then(response => response.json())
        .then(data => toObject(data))
    
      // create possible matches element for search confirmation, append to search container area
      for (let i = 0; i < 5; i++) {
        let y= document.createElement("div");
        y.className= "possibleMatchesClass";
        y.id=searchConfirmationBoxes[i];
        getClass("searchAreaContainer").appendChild(y);
      }
 
}
 
  // Click event listener on search button
  getID("searchButton").addEventListener("click", function(event) {
    clickedSearch(getID("searchTextEntry").value);
})

  // Click event listener on search options
  for (let i = 0; i < 5; i++) {
    getID("searchButton").addEventListener("click", function(event) {
   
    })
  }



// This takes the returned fetch data and stores it as an object variable so we can use this data
// in the application, it also sets up the search options inner text, it's placed here instead of 
// with the rest of the element creation because placing it here allows the variable containing
// the fetched object to exist first.
let toObject = (data) => {
  globalObjectStorage = data;
  console.log(globalObjectStorage);
  console.log(globalObjectStorage.length);

  // extract/ format the information we need from fetched object
  // globalObjectStorage.length is == fetches "&limit=X", default X= 5.
  for (let i = 0; i < globalObjectStorage.length; i++) {
    globalCountries[i]= globalObjectStorage[i].country;
    globalCities[i]= globalObjectStorage[i].name;
    getID(searchConfirmationBoxes[i]).innerHTML= 
    "Country: "+ globalCountries[i] +
    globalSpacing +
   "Name: "+ globalCities[i] +
    "<br>";
    }



  //console.log(globalCountries);
  //console.log(globalCities);
}



// just functions where the syntax for common calls is modified to my own liking
function getID(ID){
  return document.getElementById(ID);
}
function getClass(className){
  return document.querySelector("."+className);
}



