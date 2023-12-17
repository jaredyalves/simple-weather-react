import { useState } from "react";

const getSymbol = (initialState: number): number => {
  const storage = localStorage.getItem("symbol");

  return storage ? parseInt(storage) : initialState;
};

export const useSymbol = (initialState: number) => {
  const [symbol, setState] = useState<number>(getSymbol(initialState));

  const setSymbol = (symbol: number): void => {
    localStorage.setItem("symbol", symbol.toString());
    setState(symbol);
  };

  return [symbol, setSymbol] as const;
};
