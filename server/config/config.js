import dotenv from "dotenv";
dotenv.config();

const config = {
  access_APIKEY: process.env.API_KEY,
  PORT: process.env.PORT,
};
console.log(config);
export default config;
