import React, { createContext } from "react";
import store from "./store";

export const StoreContext = createContext(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
