import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
export const API_KEY = "fb812a2aef293a003c9adf0328dc08b1";
interface TempContextType {
  tempMode: boolean;
  weatherData: any;
  StateWeatherData: any;
  FetchError: boolean;
  getStateWeatherData: (cityVal: any) => void;
}


const TempratureContext = React.createContext<TempContextType | null>(null);

export const useTemp = () => {
  const context = useContext(TempratureContext);
  if (!context) {
    throw new Error("useTemp must be used within TempratureContextProvider");
  }
  return context;
};


const TempratureContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tempMode, setTempMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [StateWeatherData, setStateWeatherData] = useState(null);
  const [FetchError, setFetchError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        const res = await fetch(URL);

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();
        setWeatherData(data);
      } catch (e) {
        setFetchError(true);
      }
    })();
  }, []);

  const getStateWeatherData = async (cityVal: any) => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${API_KEY}`;
      const res = await fetch(URL);
      if (!res.ok) throw new Error("City fetch failed");
      const data = await res.json();
      setStateWeatherData(data);
    } catch {
      setFetchError(true);
    }
  };

  return (
    <TempratureContext.Provider
      value={{ tempMode, weatherData, StateWeatherData, FetchError, getStateWeatherData }}
    >
      {children}
    </TempratureContext.Provider>
  );
};

export default TempratureContextProvider;
