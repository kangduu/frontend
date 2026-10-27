---
source: "front-end-web-developer/visualization/examples/d3-tree/README.md"
---

# 层级结构树

​	层级结构树的核心目标是支持大数据量且不卡顿，需要支持节点可折叠、右键菜单、可拖拽和缩放等基础功能。

- [x] 平移、缩放
- [x] Link设置（直角线）
- [x] 内容插入
- [ ] 可折叠
- [ ] 上下文菜单（右键）
- [ ] 按需渲染
- [ ] 导出图片




## 关于根据显示字段控制节点大小的问题

1. 如何在svg元素中添加元素？
   - `foreignObject`
   - `selection.html`
   
2. 

我们在设置`d3.tree().nodeSize()`的时候，这里的参数就必须根据选择的字段进行计算了。

另外我们在设置`boxWidth`和``
   

## 可配置属性

1. 方向：vertical（垂直）、horizontal（水平）
2. 关系线样式：curve（曲线）、straight（直线）



## 关于高性能问题的思考

高性能主要包括以下几个方向：

1. 高性能计算
2. 高性能渲染
3. 高性能交互

#### 高性能计算

#### 高性能渲染

1. 按需渲染（裁剪）
2. 

#### 高性能交互

1. 离屏渲染（webWorker）




## 相关知识

- d3-selection
- d3-zoom
- d3-hierarchy
- 