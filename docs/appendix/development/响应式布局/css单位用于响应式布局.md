---
source: "front-end-web-developer/development/响应式布局/css单位用于响应式布局.md"
---

## 使用 meta 元素控制页面缩放

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

## vw、vh、vmin、vmax

1.  vw：按照<u>viewport 宽度</u>的**百分比计算**盒子的宽度或字体的大小；
2.  vh：按照<u>viewport 高度</u>的**百分比计算**盒子的高度；
3.  vmin：对比 viewport 的宽度和高度，按照<u>小的</u>做**百分比计算**；
4.  vmax：对比 viewport 的宽度和高度，按照<u>大的</u>做**百分比计算**；

**注意：上述四个单位都是按照百分比进行计算的，并且百分比基数还不一样哦。**
