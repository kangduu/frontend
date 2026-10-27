const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeData(url) {
  try {
    // 1. 使用 axios 请求网页
    const response = await axios.get(url);

    // 2. 加载网页内容到 cheerio
    const $ = cheerio.load(response.data);

    // 3. 提取页面中需要的数据
    $("table#chartsTable tbody#cpdata tr").each((index, row) => {
      const rowData = [];

      // 遍历当前行中的每个 <td> 元素，提取数据
      console.log(`row ${index + 1}`);

      let order = "",
        week = "",
        sum = "",
        figure = "";

      $(row)
        .find("td")
        .each((i, cell) => {
          const value = $(cell).text().trim();
          console.log(`-------${i}----------`, value);

          if (i === 0) order = value;
          if (i === 2) week = value;
          if (i === 4) figure = value;
          // rowData.push([cell_each[0], cell_each[4]]); // 将每个单元格的文本加入数组
          if (i === 6) sum = value;
        });

      const data = { [order]: { week, figure, sum } };
      console.log(data);

      // console.log(rowData);
    });

    // 4. 输出结果
  } catch (error) {
    console.error("爬取网页失败:", error);
  }
}

module.exports = scrapeData;
