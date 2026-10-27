---
source: "front-end-web-developer/visualization/d3/README.md"
---

## d3 modules

```js
export * from "d3-array";
export * from "d3-axis";
export * from "d3-brush";
export * from "d3-chord";
export * from "d3-color";
export * from "d3-contour";
export * from "d3-delaunay";
export * from "d3-dispatch";
export * from "d3-drag";
export * from "d3-dsv";
export * from "d3-ease";
export * from "d3-fetch";
export * from "d3-force";
export * from "d3-format";
export * from "d3-geo";
export * from "d3-hierarchy";
export * from "d3-interpolate";
export * from "d3-path";
export * from "d3-polygon";
export * from "d3-quadtree";
export * from "d3-random";
export * from "d3-scale";
export * from "d3-scale-chromatic";
export * from "d3-selection";
export * from "d3-shape";
export * from "d3-time";
export * from "d3-time-format";
export * from "d3-timer";
export * from "d3-transition";
export * from "d3-zoom";
```

## Data-Join

1. 以数据为中心的可视化操作

   根据数据的每个属性自动调整绑定图元的属性

2. 不再需要手动添加、修改和删除图元

   会根据`Data-join`的绑定自动推断

   ```js
   d3.select('.rect').data(data)
   ```

3. 如果图元的数目不等于数据的条目

   根据数据数量的条目选择相应数量的图元

###### 语法

`.data(data,keyFunction)`

- keyFunction 的返回值通常是一个字符串
- keyFunction 的定义根据数据，比如：keyFunction = d = d.name
- e.g：selection.data(data,d=>d.name)
- e.g：d3.selectAll(.rect).data(data2,d=>d.name).attr('width',d=>xScale(d.value))

`在绑定数据给图元时`

- keyFunction 为每条输入绑定的数据执行一次
- ketFunction 为每个包含数据 的图元执行一次

`如果图元之前没有绑定过任何数据，则keyFunction会报错`

- 每一次绑定时根据索引即可
- 实际的可视化任务，图元都是根据数据的'条'数动态添加（enter）、删除（exit），只需要在添加时指定好DOM的ID即可	

### 绑定数据的三个状态：Enter Update Exit

### Enter

有数据没图元，数据的条目多于图元甚至没有图元，常用于第一次数据绑定；

根据新增加的数据生成相应图元

###### 语法

```js
const p = d3.selectAll().data(data).enter().append().attr()
//可以没有选择器
```

### Update

数据改变触发图元的更新

### Exit

数据的条目少于图元甚至没有数据，常用于结束可视化





## Path	

### 属性

- d
- fill
- stroke
- stroke-width
- transform，加了描边后需要平移（x=stroke-width/2,y=stroke-width/2）

#### `d`属性（所有指令均允许小写字母，大写表示绝对定位，小写表示相对定位 ）：

- M = moveto(M X,Y)：将画笔移动到指定的坐标位置
- L = lineto(L X,Y)：画直线到指定的坐标位置
- H = horizontal lineto(H X)：画水平线到指定的X坐标位置
- V  = vertical lineto(V Y)：画垂直线到指定的Y坐标位置
- C = curveto(C X1, Y1, X2, Y2, ENDX,ENDY)：三次贝塞尔曲线
- S  = smooth curveto(S X2,Y2,ENDX,ENDY)：平滑曲率
- Q = quadratic Belzier  curve(Q X,Y,ENDX,ENDY)：二次贝塞尔曲线
- T = smooth quadratic Belzier curveto(T ENDX,ENDY)：映射
- A = elliptical Arc(A RX,RY,XROTATION,FLAG1,FLAG2,X,Y)：弧线
- Z = closepath()：关闭路径

### d3提供的path生成器（d3-shape）





## Tree

1. 使用d3提供的数据预处理，对数据元进行处理
2. 执行`Data-join`操作

```js
//.hierarchy()
const hieratchyData = d3.hierarchy(data)  // height：表示当前节点有几层子节点；depth：表示当前节点位于树结构的第几层
//.tree().size()
const treeData = d3.tree().size([innerHeight,innerWidth])

```

#### 如何控制树结构的排列方向？

`.tree().size()`

size接口参数







## 动画

- .transition() 表示进入动画
- duration