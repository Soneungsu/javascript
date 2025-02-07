let newsList = [];
const categoryMenus = document.querySelectorAll(".btn-wrap button");
const textValue = document.querySelector("#text-value");

// 1. 인풋창에 입력시 콘솔찍히게하기
// 2. Enter 이벤트추가하기
// 3. 해당 키워드 입력한 값 그리기

const getKeywordNews = (keyword) => {
  const url = new URL(`http://localhost:8080/news/${keyword}`);
  try {
    const response = fetch(url);
    if (!response.ok) {
      throw new Error("네트워크가 불안정합니다.");
    }
    const data = response.json();
    console.log(data);
    newsList = data.articles;
  } catch (error) {
    console.error("뉴스 데이터를 가져오는 도중 에러가 발생했습니다:", error);
  }
  rendor();
};

const inputValue = () => {
  textValue.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      getKeywordNews(textValue.value);
    }
  });
};

inputValue();

// navbar에 있는 버튼 클릭시 이벤트 발생
const handleCategory = (event) => {
  const category = event.target.textContent.toLowerCase(); // 클릭한 버튼의 카테고리 값 가져오기
  console.log("category:", category);
  getNewsbyCategory(category); // 해당 카테고리로 서버에 요청
};

// 카테고리 뉴스 가져오기
const getNewsbyCategory = async (category) => {
  const url = new URL(`http://localhost:8080/news/${category}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("네트워크가 불안정합니다.");
    }
    const data = await response.json();
    console.log(data);
    newsList = data.articles;
  } catch (error) {
    console.error("뉴스 데이터를 가져오는 도중 에러가 발생했습니다:", error);
  }
  rendor();
};
categoryMenus.forEach((item) => item.addEventListener("click", handleCategory));

// 전체뉴스 가져오기
const getLatesNews = async () => {
  const url = new URL("http://localhost:8080/news");
  //   console.log(url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("네트워크가 불안정합니다.");
    }
    // JSON 형태로 변환
    const data = await response.json();

    // 뉴스 데이터를 콘솔에 출력
    // console.log(data);
    newsList = data.articles;
    console.log("newsList:", newsList);
  } catch (error) {
    console.error("뉴스 데이터를 가져오는 도중 에러가 발생했습니다:", error);
  }
  rendor();
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

getLatesNews();
