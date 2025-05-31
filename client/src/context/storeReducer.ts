import decodeToken from "../utils/decodeToken";
import { StoreState } from "./storeContext";
import { StoreAction } from "../types";

export const storeReducer = (
  state: StoreState,
  action: StoreAction
): StoreState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userInfo: decodeToken(action.payload.token),
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        userInfo: null,
        token: null,
      };
    default:
      return state;
  }
};
