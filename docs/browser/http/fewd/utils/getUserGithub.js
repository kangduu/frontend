export var GitHub_User_Url = "https://api.github.com/users/";

/**
 * 使用 Fetch API 获取GitHub用户信息
 * @param username 用户名
 * @returns data 用户信息
 */

function getUserGithub(username) {
  return new Promise((resolve, reject) => {
    if (typeof username != "string" || username === "") reject(null);
    fetch(`${GitHub_User_Url}${username}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        }
        reject(res);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default getUserGithub;
