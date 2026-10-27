// 将一个字符串拆分成长度相同的字串，并保存数组中返回
function splitString(str, len) {
  const reg = new RegExp(".{1," + len + "}", "g");
  return str.match(reg);
}
