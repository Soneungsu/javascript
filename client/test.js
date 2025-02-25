for (let i = 0; i < 50; i++) {
  const str = i.toString();
  //   console.log(str);
  let sum = "";
  for (let j = 0; j < str.length; j++) {
    if (str[j] === "3" || str[j] === "6" || str[j] === "9") {
      sum += "짝";
    }
  }
  console.log(sum === "" ? i : sum);
}
