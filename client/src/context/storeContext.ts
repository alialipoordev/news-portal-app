import { createContext, Dispatch } from "react";
import { DecodedToken, StoreAction } from "../types";

export interface StoreState {
  userInfo: DecodedToken | null;
  token: string | null;
}

interface StoreContextType {
  store: StoreState;
  dispatch: Dispatch<StoreAction>;
}

const initialState: StoreContextType = {
  store: {
    userInfo: null,
    token: null,
  },
  dispatch: () => {},
};

const storeContext = createContext<StoreContextType>(initialState);

export default storeContext;
