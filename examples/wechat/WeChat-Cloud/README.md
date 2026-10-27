---
source: "front-end-web-developer/wechat/WeChat-Cloud/README.md"
---

# 微信开发与WEB网页开发的区别

### WXML 和 HTML 的区别有哪些？

1. 多了一些 wx:if 这样的属性以及 {{ }} 这样的表达式
    ```
    <text>{{msg}}</text> //数据绑定
    
    this.setData({ msg: "Hello World" })
    ```
    
2. 需要 if/else, for等控制能力，这些都用 wx: 开头的属性来表达

3. 小程序在 WXSS 做了哪些扩充和修改

    1. 新增了尺寸单位。
    2. 提供了全局的样式和局部样式。
    3. `WXSS` 仅支持部分 `CSS` 选择器。


