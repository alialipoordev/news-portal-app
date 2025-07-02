type Mode = "development" | "production";

const PRODUCTION_MODE: string = "production";

const mode: Mode = "development";

const BASE_URL: string =
  mode === PRODUCTION_MODE
    ? "https://your-production-domain.com/"
    : "http://localhost:5000";

export default BASE_URL;
