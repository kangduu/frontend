/**
 * 匹配url中的参数
 * @param {string} url
 * @returns {object} {key:value}
 */
export default function (url) {
  try {
    if (typeof url === "string" && url) {
      const index = url.indexOf("?");
      if (index != -1) {
        const reg = new RegExp("\\?", "g");
        url = url.slice(index + 1).replace(reg, "&");
      }

      const params = url.split("&").reduce((a, b) => {
        if (b) {
          const [key, value] = b.split("=");
          Object.assign(a, { [key]: decodeURI(value) });
        }
        return a;
      }, {});

      return params;
    }
    return {};
  } catch (error) {
    return {};
  }
}
