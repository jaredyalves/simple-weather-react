import React, { useEffect, useRef, useState } from "react";
import { useGeocoding } from "../hooks/useGeocoding.ts";
import { useOpenWeather } from "../hooks/useOpenWeather.ts";
import { useSymbol } from "../hooks/useSymbol.ts";
import { Geocoding } from "../interfaces/Geocoding.ts";
import { OpenWeather } from "../interfaces/OpenWeather.ts";
import { toCelsius } from "../utils/toCelsius.ts";
import { toFahrenheit } from "../utils/toFahrenheit.ts";

const App = () => {
  const ref = useRef<HTMLSpanElement>(null);

  const [query, setQuery] = useState("London, GB");
  const [symbol, setSymbol] = useSymbol(0);

  const geocoding: Geocoding = useGeocoding(query);
  const openWeather: OpenWeather = useOpenWeather(
    geocoding?.lat ?? 0,
    geocoding?.lon ?? 0,
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    if (e.currentTarget?.textContent) {
      setQuery(e.currentTarget.textContent);
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <>
      <div className={"flex min-h-screen flex-col"}>
        <div className="flex flex-grow flex-col items-center justify-center space-y-6 md:space-y-8">
          <div className={"flex items-baseline text-2xl"}>
            Right now in&nbsp;
            <span
              ref={ref}
              autoFocus={true}
              contentEditable={true}
              className="border-b border-neutral-400 p-2 font-bold text-white focus:border-white"
              dangerouslySetInnerHTML={{ __html: "London, GB" }}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
            />
            ,&nbsp;
            {openWeather.weather ? openWeather.weather[0].description : "..."}.
          </div>

          <div className={"flex md:grid md:grid-cols-3"}>
            <div className={"m-auto"}>
              {openWeather?.weather ? (
                <img
                  src={`https://openweathermap.org/img/wn/${openWeather.weather[0].icon}@4x.png`}
                  alt={openWeather.weather[0].description}
                  className={"w-36"}
                />
              ) : (
                "..."
              )}
            </div>

            <div className={"flex flex-col items-center justify-center"}>
              <div className={"text-8xl font-bold text-white"}>
                {openWeather?.main
                  ? symbol === 0
                    ? toCelsius(openWeather.main.temp)
                    : toFahrenheit(openWeather.main.temp)
                  : "..."}
              </div>

              <div className={"text-sm"}>
                {openWeather?.main
                  ? symbol === 0
                    ? toCelsius(openWeather.main.temp_min)
                    : toFahrenheit(openWeather.main.temp_min)
                  : "..."}
                &deg;&nbsp;/&nbsp;
                {openWeather?.main
                  ? symbol === 0
                    ? toCelsius(openWeather.main.temp_max)
                    : toFahrenheit(openWeather.main.temp_max)
                  : "..."}
                &deg;
              </div>
            </div>

            <div className={"m-auto"}>
              <div>
                <span className={"font-bold"}>Feels like:&nbsp;</span>
                {openWeather?.main
                  ? symbol === 0
                    ? toCelsius(openWeather.main.feels_like)
                    : toFahrenheit(openWeather.main.feels_like)
                  : "..."}
                &deg;
              </div>

              <div>
                <span className={"font-bold"}>Humidity:&nbsp;</span>
                {openWeather?.main?.humidity ?? "..."}%
              </div>
            </div>
          </div>
        </div>

        <div className={"flex items-center justify-center"}>
          <div className={"py-2"}>
            <button
              className={`${symbol === 0 ? "text-white" : ""}`}
              onClick={() => setSymbol(0)}
            >
              °C
            </button>
            <span> / </span>
            <button
              className={`${symbol === 1 ? "text-white" : ""}`}
              onClick={() => setSymbol(1)}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
