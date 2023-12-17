import { toCelsius } from "./toCelsius.ts";

export const toFahrenheit = (kelvin: number): number => {
  return Math.round(toCelsius(kelvin) * 1.8 + 32);
};
