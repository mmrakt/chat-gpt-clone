import path from "path";
import { config } from "dotenv";

export const loadEnv = () => {
  config({
    path: path.join(__dirname, "../../../.env"),
  });
};
