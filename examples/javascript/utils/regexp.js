// 同时包含数字和字母
const NumAndWord = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,20}$/g

// 检验手机号   正则表达式  /^1[3|4|5|7|8][0-9]{9}$/
function checkPhone(phone) {
  var reg = /^1[3|4|5|7|8][0-9]{9}$/;
  return reg.test(phone);
}

// 检验邮箱   正则表达式  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
function checkEmail(email) {
  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(email);
}

// 检验身份证   正则表达式  /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
function checkIdCard(idCard) {
  var reg =
    /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  return reg.test(idCard);
}

// 检验银行卡号   正则表达式  /^[1-9]\d{9}$/
function checkBankCard(bankCard) {
  var reg = /^[1-9]\d{9}$/;
  return reg.test(bankCard);
}

// 检验密码   正则表达式  /^[a-zA-Z0-9]{6,16}$/
function checkPassword(password) {
  var reg = /^[a-zA-Z0-9]{6,16}$/;
  return reg.test(password);
}

// 检验验证码   正则表达式  /^[0-9]{6}$/
function checkCode(code) {
  var reg = /^[0-9]{6}$/;
  return reg.test(code);
}

// QQ号码   正则表达式  /^[1-9][0-9]{4,9}$/
function checkQQ(qq) {
  var reg = /^[1-9][0-9]{4,9}$/;
  return reg.test(qq);
}

// 微信号码   正则表达式  /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
function checkWeChat(weChat) {
  var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
  return reg.test(weChat);
}
