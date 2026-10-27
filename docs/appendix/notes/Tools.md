---
source: "front-end-web-developer/Tools.md"
---

### 删除文件夹

- 快速删除 node_modules 文件夹 https://blog.csdn.net/wu5229485/article/details/82985205

  ```cmd
  npm install rimraf -g // 全局安装
  rimraf 'file name' // 删除指定文件
  ```

### .npmrc 文件

```r
# 指定npm下载安装包的源地址，默认https://registry.npmjs.org/
registry=https://registry.npm.taobao.org
```
