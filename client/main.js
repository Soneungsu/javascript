let newsList = [];
const categoryMenus = document.querySelectorAll(".btn-wrap button");
const textValue = document.querySelector("#text-value");

// 1. 인풋창에 입력시 콘솔찍히게하기
// 2. Enter 이벤트추가하기
// 3. 해당 키워드 입력한 값 그리기

let url = new URL("http://localhost:8080/news");

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    console.log("response: ", response);

    if (!response.ok) {
      throw new Error("네트워크가 불안정합니다.");
    }
    const data = await response.json();
    console.log("data: ", data);
    if (data.message) {
      throw new Error(data.message);
    }
    newsList = data.articles;
    rendor();
  } catch (error) {
    console.error("error:", error.message);
    errorRendor(error.message);
  }
};

const getKeywordNews = async (keyword) => {
  url = new URL(`http://localhost:8080/news/${keyword}`);
  await fetchData(url);
};

const inputValue = () => {
  textValue.addEventListener("keyup", async (event) => {
    // console.log(event);
    if (event.key === "Enter") {
      await getKeywordNews(textValue.value);
    }
  });
};

inputValue();

// navbar에 있는 버튼 클릭시 이벤트 발생
const handleCategory = async (event) => {
  const category = event.target.textContent.toLowerCase(); // 클릭한 버튼의 카테고리 값 가져오기
  console.log("category:", category);
  await getNewsbyCategory(category); // 해당 카테고리로 서버에 요청
};

// 카테고리 뉴스 가져오기
const getNewsbyCategory = async (category) => {
  url = new URL(`http://localhost:8080/news/${category}`);
  await fetchData(url);
};
categoryMenus.forEach((item) => item.addEventListener("click", handleCategory));

// 전체뉴스 가져오기
const getLatesNews = async () => {
  url = new URL("http://localhost:8080/news");
  //   console.log(url);

  await fetchData(url);
};

// api 호출시 해당 뉴스 UI
const rendor = () => {
  let newsHTML = ``;
  newsHTML = newsList
    .map((item) => {
      return `<section>
          <div class="img-wrap">
            <img
              src=${item.urlToImage}
              alt="ripple"
            />
          </div>
          <div class="description-wrap">
            <h2>${item.title}</h2>
            <p>
             ${item.description}
            </p>
            <div class="date">${item.publishedAt}</div>
          </div>
        </section>`;
    })
    .join("");

  document.querySelector("#main-wrap").innerHTML = newsHTML;
};

const errorRendor = (errorMessage) => {
  const errorHTML = `  <div class="error-wrap">
          <p>${errorMessage}</p>
        </div>`;
  document.querySelector("#main-wrap").innerHTML = errorHTML;
};

getLatesNews();
