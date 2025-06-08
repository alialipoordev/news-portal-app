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

export interface ErrorAxios {
  response: { data: { message: string } };
}

export interface WriterUser {
  _id: string;
  name: string;
  email: string;
  role: "writer";
  category: string;
  image: string;
}

export interface UploadedImage {
  url: string;
  writerId: string;
}

export interface NewsArticle {
  writerId: string;
  name: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  description: string;
  date: string;
  status: "pending" | "inactive" | "active";
  count: number;
}
