type Mode = "development" | "production";

const PRODUCTION_MODE: string = "production";

const mode: Mode = "production";

const BASE_URL: string =
  mode === PRODUCTION_MODE
    ? (process.env.NEXT_PUBLIC_BASE_URL_API as string)
    : "http://localhost:5000";

export default BASE_URL;
