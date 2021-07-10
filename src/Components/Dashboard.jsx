import React, { useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
import WeatherProvider from "../Providers/WeatherProvider";

import WeatherModule from "./Dashboard/WeatherModule";
import RoutineModule from "./Dashboard/RoutineModule";
import QuoteOfTheDay from "./Dashboard/QuoteOfTheDay";

import { getGridCellSize } from "../Tools";
import "../Styles/Dashboard/Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { displayName } = user;

  const gridCellSize = getGridCellSize();

  return (
    <div className="container dashboardContainer">
      <h1>Good morning, {displayName}!</h1>
      <QuoteOfTheDay />
      <div
        className="dashboardGrid"
        style={{
          gridTemplateColumns: `repeat(12, ${gridCellSize}px)`,
          gridTemplateRows: `repeat(100, ${gridCellSize}px)`,
        }}
      >
        <WeatherProvider>
          <WeatherModule />
        </WeatherProvider>
        <RoutineModule />
      </div>
    </div>
  );
};

export default Dashboard;
