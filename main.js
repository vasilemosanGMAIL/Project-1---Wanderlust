//Foursquare
const clientId = "PU3IY1PZEOOANTPSHKNMS5HFSMEGEQ1IAVJYGYM4YVZP3NGD";
const clientSecret = "0V21IXU0EETE3SZJGGCP4T4R13NUTBJ0LMI5WQY45IMDPEKY";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

//OpenWeather
const openWeatherKey = "45dc1d2e92f646d108fe518401d1e210";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

//El
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210610`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(
        (item) => item.venue
      );

      console.log(response);
      console.log(venues);

      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

const renderVenues = (venues) => {
  $venueDivs.forEach(($venue) => {
    const venue = venues[Math.floor(Math.random() * 10)];
    const venueIcon = venue.categories[0].icon;
    console.log(venueIcon);
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    const venueContent = createVenueHTML(
      venue.name,
      venue.location,
      venueImgSrc
    );
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then((venues) => {
    return renderVenues(venues);
  });
  getForecast().then((forecast) => {
    return renderForecast(forecast);
  });
  return false;
};

$submit.click(executeSearch);
