import axios from "axios";
import path from "path";

export const getWeatherData = async (geolocation, openWeatherMapKey) => {
  const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&appid=${openWeatherMapKey}&units=metric&lang=en`);
  const weatherData = apiResponse.data;

  if (apiResponse.status && apiResponse.status !== 200) {
    console.error(weatherData.message);
    return null;
  }

  const nextHourData = weatherData.hourly[0];

  const weatherTimestamp = new Date(nextHourData.dt * 1000);
  const weatherTimestampString = `${`0${weatherTimestamp.getDate()}`.substr(
    -2
  )}.${`0${weatherTimestamp.getMonth() + 1}`.substr(
    -2
  )}. ${`0${weatherTimestamp.getHours()}`.substr(
    -2
  )}:${`0${weatherTimestamp.getMinutes()}`.substr(-2)}`;

  return {
    cloudPercentage: `${parseInt(nextHourData.clouds, 10)}%`,
    feelsLike: `${parseInt(nextHourData.feels_like, 10)}°C`,
    humidity: `${parseInt(nextHourData.humidity, 10)}%`,
    temperature: `${parseInt(nextHourData.temp, 10)}°C`,
    description: nextHourData.weather[0].description,
    icon: path.join(
      "/",
      "assets",
      "weather_icons",
      `${nextHourData.weather[0].icon}@2x.png`
    ),
    timestamp: weatherTimestampString,
  };
}