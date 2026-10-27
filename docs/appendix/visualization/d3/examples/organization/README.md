---
source: "front-end-web-developer/visualization/d3/examples/organization/README.md"
---

# 网络传销组织树

- 树结构
- 至少1000个节点
- 可保存为图片
- `SVG`版本或`Canvas`版本

## 版本选择

关于使用`SVG`和`Canvas `具体场景分析

- `SVG`便于操作`DOM`元素，控制用户交互；但是渲染效率不高（大数据量），页面易掉帧、卡顿
- `Canvas` 对于用户交互不够友好，不如操作`DOM`来的直接；但是对于大数据量却表现的很出色

## 功能需求
1.  ≥ 1000 个节点渲染
2. 拖拽
3. 缩放
4. 保存为图片

## 伪代码

#### SVG版本
1. 数据包装处理：`d3.hierarchy()`  `d3.tree().size([a,b])(data)`
2. 绘制图形：线，圆，文本等
3. 绘制线
    ```js
        
    ```


## 问题
1. 如何实现SVG动态高宽？
