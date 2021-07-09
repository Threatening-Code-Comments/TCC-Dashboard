import React, { Component, createContext } from "react";
import { UserContext } from "./UserProvider";
import { getWeatherData } from "../Weather";

export const WeatherContext = createContext({
  geolocation: null,
  weatherData: null,
});

class WeatherProvider extends Component {
  state = {
    user: null,
    preferences: null,
    initialized: false,
  };

  static contextType = UserContext;

  render() {
    const state = this.state;

    const { preferences } = this.context;

    if (!state.initialized && preferences) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeatherData(position, preferences.weather.openWeatherMapKey).then(
          (weatherData) => {
            this.setState({
              geolocation: position,
              weatherData: weatherData,
              initialized: true,
            });
          }
        );
      });
    }

    return (
      <WeatherContext.Provider value={state}>
        {this.props.children}
      </WeatherContext.Provider>
    );
  }
}

export default WeatherProvider;
