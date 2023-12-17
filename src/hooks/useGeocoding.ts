import { useEffect, useState } from "react";
import { Geocoding } from "../interfaces/Geocoding.ts";

export const useGeocoding = (query: string) => {
  const [geocoding, setGeocoding] = useState<Geocoding>({} as Geocoding);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        const apiKey: string = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const uri: string = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`;

        try {
          const response: Response = await fetch(uri);
          const data: Geocoding[] = await response.json();

          if (data) {
            setGeocoding(data[0]);
          }
        } catch (e) {
          console.error(e);
        }
      };

      const timeout: number = setTimeout(() => {
        fetchData().then();
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [query]);

  return geocoding;
};
