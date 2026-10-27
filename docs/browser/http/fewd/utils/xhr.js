/**
 * 创建一个XMLHttpRequest实例，兼容性写法。
 * @returns xhr XMLHttpRequest实例
 */
function createXHR() {
  var xhr;

  if (typeof XMLHttpRequest != "undefined") {
    xhr = new XMLHttpRequest();
  } else {
    var aVersions = [
      "Msxml2.XMLHttp.5.0",
      "Msxml2.XMLHttp.4.0",
      "Msxml2.XMLHttp.3.0",
      "Msxml2.XMLHttp",
      "Microsoft.XMLHttp",
    ];
    for (var i = 0; i < aVersions.length; i++) {
      try {
        xmlHttp = new ActiveXObject(aVersions[i]);
        break;
      } catch (e) {}
    }
  }

  return xhr;
}

export default createXHR;
