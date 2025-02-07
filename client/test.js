const btnTest = document.querySelector("#btn-test");

const test = (event) => {
  console.log("event-keydown:", event);
  console.log("test-keyup:", event);
};

btnTest.addEventListener("keydown", test);
btnTest.addEventListener("keyup", test);
