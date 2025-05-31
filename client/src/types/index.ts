export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export type StoreAction =
  | {
      type: "LOGIN_SUCCESS";
      payload: { token: string };
    }
  | {
      type: "LOGOUT";
    };
