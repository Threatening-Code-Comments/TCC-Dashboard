import React, { useContext } from "react";
import { WeatherContext } from "../../Providers/WeatherProvider";
import "../../Styles/Dashboard/Weather.css";
import { getGridCellSize } from "../../Tools";

const WeatherModule = () => {
  const { geolocation, weatherData } = useContext(WeatherContext);

  if (!geolocation || !weatherData) return null;

  const gridCellSize = getGridCellSize();

  const gridStartX = 11,
    gridStartY = 1;
  const gridWidth = 2,
    gridHeight = 3;

  return (
    <div
      className="glass card weather"
      style={{
        gridColumn: gridStartX,
        gridColumnEnd: gridStartX + gridWidth,
        gridRow: gridStartY,
        gridRowEnd: gridStartY + gridHeight,
        fontSize: `${gridCellSize / 100}rem`,
      }}
    >
      <img
        src={weatherData.icon}
        alt=""
        className="weatherIcon"
        style={{ width: `${(gridCellSize / 2) * gridWidth}px` }}
      />
      <span className="weatherTemperature">{weatherData.temperature}</span>
      <span className="weatherDescription">{weatherData.description}</span>
      <span className="weatherFeelsLike">
        Feels like {weatherData.feelsLike}
      </span>
      <span className="weatherHumidity">Humidity: {weatherData.humidity}</span>
    </div>
  );
};

export default WeatherModule;
