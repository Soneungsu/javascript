import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/config.js";

const app = express();
const PORT = config.PORT || 8080;
const API_KEY = config.access_APIKEY;

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);
app.use(helmet());
app.use(morgan("tiny"));

let url;
// Fetch
const fetchData = async (url, res) => {
  console.log(url);
  try {
    const response = await fetch(url);
    console.log("response:", response);
    const data = await response.json();
    console.log("data:", data);
    res.json(data); // 클라이언트에 JSON 응답
  } catch (error) {
    res.status(500).json("error:", error);
  }
};
//
app.get("/news", async (req, res) => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  await fetchData(url, res);
});

app.get("/news/:params", async (req, res) => {
  const params = req.params.params;
  const category = [
    "business",
    "sports",
    "technology",
    "health",
    "entertainment",
  ];
  url = category.includes(params)
    ? new URL(
        `https://newsapi.org/v2/top-headlines?country=us&category=${params}&apiKey=${API_KEY}`
      )
    : new URL(
        `https://newsapi.org/v2/top-headlines?country=us&q=${params}&apiKey=${API_KEY}`
      );
  await fetchData(url, res);
});

app.listen(PORT, () => {
  console.log("open server");
});
