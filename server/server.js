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
    origin: "*" || "http://127.0.0.1:5500",
  })
);
app.use(helmet());
app.use(morgan("tiny"));

app.get("/news", async (req, res) => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // 클라이언트에 JSON 응답
  } catch (error) {
    res
      .status(500)
      .json({ message: "뉴스 데이터를 가져오는 도중 에러가 발생했습니다." });
  }
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
  const url = category.includes(params)
    ? `https://newsapi.org/v2/top-headlines?country=us&category=${params}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=us&q=${params}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "뉴스 데이터를 가져오는 도중 에러가 발생했습니다." });
  }
});

// app.get("/news/:category", async (req, res) => {
//   const category = req.params.category;
//   const url = new URL(
//     `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
//   );
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "뉴스 데이터를 가져오는 도중 에러가 발생했습니다." });
//   }
// });

// app.get("/news/keyword/:keyword", async (req, res) => {
//   const keyword = req.params.keyword;
//   const url = new URL(
//     `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
//   );
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     res.json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "뉴스 데이터를 가져오는 도중 에러가 발생했습니다." });
//   }
// });

app.listen(PORT, () => {
  console.log("open server");
});
