import axios from "axios";

const BASE_URL = "https://weather.visualcrossing.com/";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY;

export async function fetchTodayWeather(city, region) {
  const response = await axios.get(
    `${BASE_URL}VisualCrossingWebServices/rest/services/timeline/${city} ${region}/today?unitGroup=metric&include=days&key=${WEATHER_API_KEY}&contentType=json`
  );
  return response.data;
}

export async function fetchFromToWeather(city, region, from, to) {
  const response = await axios.get(
    `${BASE_URL}VisualCrossingWebServices/rest/services/timeline/${city} ${region}/${from}/${to}?unitGroup=metric&include=days&key=${WEATHER_API_KEY}&contentType=json`
  );
  return response.data;
}
