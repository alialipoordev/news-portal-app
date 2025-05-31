import { ReactNode, useReducer } from "react";
import storeContext, { StoreState } from "./storeContext";
import { storeReducer } from "./storeReducer";
import decodeToken from "../utils/decodeToken";

interface StoreProviderProps {
  children: ReactNode;
}

const rawToken = localStorage.getItem("newsToken") || "";

const initialState: StoreState = {
  userInfo: decodeToken(rawToken),
  token: rawToken,
};

function StoreProvider({ children }: StoreProviderProps) {
  const [store, dispatch] = useReducer(storeReducer, initialState);

  return (
    <storeContext.Provider value={{ store, dispatch }}>
      {children}
    </storeContext.Provider>
  );
}

export default StoreProvider;
