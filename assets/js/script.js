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


getID("searchButton").addEventListener("click", function(event) {  
  let searchQuery= getID("searchTextEntry").value;
  console.log(searchQuery);

  fetch("http://api.openweathermap.org/geo/1.0/direct?q="+searchQuery+"&limit=5&appid="+APIKey)
  .then((response) => response.json())
  .then((data) => console.log(data));


 })


function getID(ID){
  return document.getElementById(ID);
}