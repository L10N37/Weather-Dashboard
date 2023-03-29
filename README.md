# Weather-Dashboard
<br />
Module 6 challenge for the Monash fullstack developer bootcamp.
<br />

## User Story
<br />
AS A traveler<br />
I WANT to see the weather outlook for multiple cities<br />
SO THAT I can plan a trip accordingly<br />
<br />
Acceptance Criteria
<br />
GIVEN a weather dashboard with form inputs<br />
WHEN I search for a city<br />
THEN I am presented with current and future conditions for that city and that city is added to the search history<br />
WHEN I view current weather conditions for that city<br />
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed<br />
WHEN I view future weather conditions for that city<br />
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity<br />
WHEN I click on a city in the search history<br />
THEN I am again presented with current and future conditions for that city<br />
<br />

## Usage
<br />
When the application is first loaded you will have a blank search history. <br />
You are free to go ahead and enter the location you are looking for a weather forecast on. <br />
A new menu will appear to home in on your search as there could be multiple locations with the same name globally. Up to 5 option will appear. <br />
Once you select the correct area, you will be presented with <br />
1: The most current weather update. The app compares the current time of day, then uses some simple algorithms to determine the most suitable weather udpate to display for the current day. Either the weather prediction for the current hour will be displayed, or the next forecast which would be a maximum of 2 hours into the future from the time you performed the search.
<br />
2: The app is currently set up to display the next 4 days midday forecast. This is easily adjustable and commented in the code if for example you wanted to show the 9am or 3pm forecasts instead.
<br />
A previous search history has also being implemented with 5 prior searches saved. Once the 5 slots are filled, you would have to delete your browser history to reset the history slots.
This could easily be expanded to store more search history slots.
<br />
## Features
<br />
Not much at this stage, just a 5 day weather forecast.
<br />

## Application Screenshot

<p align="center">
  <img src=assets/images/Screenshot.png>
</p>

## Live link to deployed application
<br />
https://l10n37.github.io/Weather-Dashboard
