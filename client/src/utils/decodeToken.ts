import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types";

const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const exp = new Date(decoded.exp * 1000);

    if (exp < new Date()) {
      localStorage.removeItem("newsToken");
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
};

export default decodeToken;
