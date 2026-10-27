const scrapeData = require("./fetch");

const data = scrapeData(
  "https://view.lottery.sina.com.cn/lotto/pc_zst/index?lottoType=p3&actionType=chzs&type=50&dpc=1"
);
// const data = scrapeData("https://www.lottery.gov.cn/kj/kjlb.html?pls");
