import { useEffect, useState } from "react";
import { OpenWeather } from "../interfaces/OpenWeather.ts";

export const useOpenWeather = (lat: number, lon: number) => {
  const [openWeather, setOpenWeather] = useState<OpenWeather>(
    {} as OpenWeather,
  );

  useEffect(() => {
    if (lat && lon) {
      const fetchData = async () => {
        const apiKey: string = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const uri: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        try {
          const response: Response = await fetch(uri);
          const data: OpenWeather = await response.json();

          if (data) {
            setOpenWeather(data);
          }
        } catch (e) {
          console.error(e);
        }
      };

      fetchData().then();
    }
  }, [lat, lon]);

  return openWeather;
};
