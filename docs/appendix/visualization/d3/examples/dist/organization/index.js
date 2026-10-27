"use strict";
var OrgTreeV1;
(function (OrgTreeV1) {
    // 线条配置
    let ITreeLinkStyle;
    (function (ITreeLinkStyle) {
        ITreeLinkStyle["CURVE"] = "curve";
        ITreeLinkStyle["STRAIGHT"] = "straight";
    })(ITreeLinkStyle || (ITreeLinkStyle = {}));
    // 方向配置
    let ITreeDirection;
    (function (ITreeDirection) {
        ITreeDirection["VERTICAL"] = "vertical";
        ITreeDirection["HORIZONTAL"] = "horizontal";
    })(ITreeDirection || (ITreeDirection = {}));
    class OrgTree {
        constructor(selector, data, cfg) {
            // tools
            const { d3, _: lodash } = window;
            this.d3 = d3;
            this.lodash = lodash;
            // props
            this.dataset = data;
            this.wrapSelector = selector;
            this.config = Object.assign(Object.assign({}, OrgTree.DEFAULT_CONFIG), cfg);
            // 初始化
            this.init();
            // 重置接口
            this.reset = () => {
                // 一： 只是重置位置和缩放比例？
                this.initTransform();
                // 二：树结构也重置？
                // TODO 删除svg节点，重新执行init方法
            };
            // 放大缩小接口
            this.enableZoom = lodash.throttle(this.enableZoom.bind(this), 80);
            // 导出图片
            this.exportingImage = lodash.throttle(this.exportingImage.bind(this), 80);
            // 添加滚轮事件
            this.onWheel();
            // 添加拖拽事件
            this.enableDrag();
        }
        // 初始化
        init() {
            const { d3, dataset } = this;
            const { dx, dy } = this.config;
            this.root = d3.hierarchy(dataset);
            this.root.x0 = dy / 2;
            this.root.y0 = 0;
            this.tree = d3.tree().nodeSize([dx, dy]);
            this.diagonal = d3.linkHorizontal().x((d) => d.y).y((d) => d.x);
            // 对叶子节点数据进行处理，
            // TODO：默认展示那些节点？（还是默认展示全部节点）
            this.root.descendants().forEach((d, i) => {
                // id 和 _children 属性的作用是更新nondes
                d.id = i;
                d._children = d.children;
                // 默认通过depth进行控制,
                // 后续可根据d.data属性来配置默认expand值
                if (d.depth && d.depth > 1)
                    d.children = null;
            });
            // const { left, top } = this.config.margin
            // 创建svg标签
            const svg = d3.create("svg")
                .attr('id', OrgTree.SVG_UID)
                // .attr("viewBox", [-left, -top, width, dx])
                .style("font", this.config.font)
                .style("user-select", "none");
            // 生成线
            this.gLink = svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.4)
                .attr("stroke-width", 1.5);
            // 生成节点
            this.gNode = svg.append("g")
                .attr("cursor", "pointer")
                .attr("pointer-events", "all");
            this.svg = svg;
            // Update 
            this.update(this.root);
            // 初始位置
            this.initTransform();
            // 将节点添加到body中
            document.body.insertBefore(this.svg.node(), document.getElementById("tools"));
            // const cloneSvg = this.svg.clone(true)
        }
        // 获取svg.viewBox属性，输出为数组
        getSvgViewBox() {
            return this.svg.attr('viewBox').split(',');
        }
        // 缩放时同步修改svg.viewBox
        // setViewBoxWithZoom(scale: number) {
        //     const newViewBox = this.getSvgViewBox()
        //         .map((value: number) => (value * scale).toFixed(0))
        //         .join(',')
        //     this.svg
        //         .attr("viewBox", newViewBox)
        // }
        // 放大 
        zoomIn(record) {
            // 如果已有scale属性, 在原基础上修改
            let targetScale = 1 * 1.2;
            const scaleMatchResult = record.match(OrgTree.MATCH_SCALE_REGEX);
            if (scaleMatchResult && scaleMatchResult.length > 0) {
                const originScale = parseFloat(scaleMatchResult[1]);
                targetScale *= originScale;
            }
            // 边界限制
            if (targetScale > 3)
                return '';
            // 更新比例
            this.currentScale = targetScale;
            // 更新svg.viewBox
            // this.setViewBoxWithZoom(targetScale)
            return record.replace(OrgTree.MATCH_SCALE_REGEX, `scale(${targetScale})`);
        }
        // 缩小 
        zoomOut(record) {
            // 如果已有scale属性, 在原基础上修改
            let targetScale = 1 / 1.1;
            const scaleMatchResult = record.match(OrgTree.MATCH_SCALE_REGEX);
            if (scaleMatchResult && scaleMatchResult.length > 0) {
                const originScale = parseFloat(scaleMatchResult[1]);
                targetScale = originScale / 1.2;
            }
            // 边界限制
            if (targetScale < 0.5)
                return '';
            // 更新比例
            this.currentScale = targetScale;
            // viewBox
            // this.setViewBoxWithZoom(targetScale)
            return record.replace(OrgTree.MATCH_SCALE_REGEX, `scale(${targetScale})`);
        }
        // 缩放
        enableZoom(delta) {
            // 历史记录
            const originTransformStr = this.svg.style('transform');
            // 新的值
            let newTransform = originTransformStr;
            // 向下滚动（缩小）
            if (delta > 0) {
                newTransform = this.zoomOut(originTransformStr);
            }
            // 向上滚动（放大）
            if (delta < 0) {
                newTransform = this.zoomIn(originTransformStr);
            }
            // 如果返回的是空字符串，便是不需要更新
            if (newTransform !== '' &&
                newTransform !== originTransformStr) {
                this.svg.style('transform', newTransform);
            }
        }
        // 添加鼠标滚轮滚动事件处理
        onWheel() {
            const { d3, lodash, wrapSelector } = this;
            const wrapper = d3.select(wrapSelector);
            const enableZoom = this.enableZoom.bind(this);
            // 滚轮
            wrapper.on('wheel', lodash.throttle((event) => {
                enableZoom(event.deltaY);
            }, 80));
        }
        // Drag 
        enableDrag() {
            const wrapper = this.d3.select(this.wrapSelector);
            wrapper.style("cursor", "grab");
            const { svg } = this;
            // const currentScale = this.currentScale
            let isDrag = false, startX = 0, startY = 0, mouseDownTransform = ''; // 保存鼠标点下时的位移
            // 鼠标按下
            wrapper.on('mousedown', function (event) {
                wrapper.style("cursor", "grabbing");
                mouseDownTransform = svg.style('transform');
                startX = event.clientX;
                startY = event.clientY;
                isDrag = true;
            });
            // 鼠标移动
            wrapper.on('mousemove', this.lodash.throttle(function (event) {
                if (isDrag === false)
                    return;
                const originTransform = mouseDownTransform;
                let originOffsetX = 0;
                let originOffsetY = 0;
                if (originTransform && originTransform !== 'none') {
                    const result = originTransform.match(OrgTree.MATCH_TRANSLATE_REGEX);
                    if (result !== null && result.length !== 0) {
                        const [offsetX, offsetY] = result.slice(1);
                        originOffsetX = parseInt(offsetX);
                        originOffsetY = parseInt(offsetY);
                    }
                }
                // let newX = Math.floor((event.clientX - startX) / (currentScale as number)) + originOffsetX
                // let newY = Math.floor((event.clientY - startY) / (currentScale as number)) + originOffsetY
                let newX = Math.floor((event.clientX - startX)) + originOffsetX;
                let newY = Math.floor((event.clientY - startY)) + originOffsetY;
                let transformStr = `translate(${newX}px, ${newY}px)`;
                if (originTransform && originTransform !== 'none') {
                    transformStr = originTransform.replace(OrgTree.MATCH_TRANSLATE_REGEX, transformStr);
                }
                svg.style("transform", transformStr);
            }, 80));
            // 鼠标离开
            wrapper.on('mouseup', function () {
                wrapper.style("cursor", "grab");
                startX = 0;
                startY = 0;
                isDrag = false;
            });
        }
        // 图元颜色填充
        fillColor(color, d) {
            if (d.depth === 0) {
                return color(d.data.name);
            }
            while (d.depth > 1) {
                d = d.parent;
            }
            return color(d.data.name);
        }
        // 更新树
        update(source) {
            const { d3, root, tree, svg, gLink, gNode, diagonal } = this;
            const duration = d3.event && d3.event.altKey ? 2500 : 250;
            const nodes = root.descendants().reverse();
            const links = root.links();
            // 颜色生成函数
            const color = d3.scaleOrdinal()
                .domain(root.descendants().map((d) => d.data.name))
                .range(d3.schemeCategory10);
            const fill = this.fillColor.bind(this, color);
            // 计算新的树布局
            tree(root);
            // 获取最多叶子层级的左右节点
            let leftNode = root;
            let rightNode = root;
            let maxDepth = 1;
            root.eachBefore((node) => {
                if (node.x < leftNode.x)
                    leftNode = node;
                if (node.x > rightNode.x)
                    rightNode = node;
                if (node.depth > maxDepth)
                    maxDepth = node.depth;
            });
            const { top, bottom, left } = this.config.margin;
            const height = rightNode.x - leftNode.x + top + bottom;
            const width = (maxDepth + 1) * this.config.dy;
            const transition = svg.transition()
                .duration(duration)
                .attr("viewBox", [-left, leftNode.x - top, width, height])
                .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));
            //更新所有的节点
            const node = gNode.selectAll("g")
                .data(nodes, (d) => d.id);
            //在父节点以前的位置输入任何的新节点
            const nodeEnter = node.enter().append("g")
                .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .on("click", (event, d) => {
                d.children = d.children ? null : d._children;
                this.update(d);
            });
            // 设置节点圆
            nodeEnter.append("circle")
                // .attr('cx', (d: any) => d.y)
                // .attr('cy', (d: any) => d.x)
                .attr('stroke-width', 3)
                .attr('r', 6)
                // .attr("fill", (d: any) => d._children ? "#555" : "#999")
                // .attr("stroke-width", 10)
                .attr("fill", fill)
                .style('cursor', 'pointer')
                .style('opacity', (d) => d._children ? "1" : "0.6");
            // 设置文本
            nodeEnter.append("text")
                .attr("dy", "0.31em")
                .attr("x", (d) => d._children ? -10 : 10)
                .attr("text-anchor", (d) => d._children ? "end" : "start")
                .text((d) => d.data.name)
                .clone(true).lower()
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 2)
                .attr("stroke", "white");
            // 转换节点到新位置
            const nodeUpdate = node.merge(nodeEnter).transition(transition)
                .attr("transform", (d) => `translate(${d.y},${d.x})`)
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);
            // 将退出的节点转换到父节点位置
            const nodeExit = node.exit().transition(transition).remove()
                .attr("transform", (d) => `translate(${source.y},${source.x})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);
            // 更新线
            const link = gLink.selectAll("path")
                .data(links, (d) => d.target.id);
            // Enter 时在父节点前置位置建立一个新的线
            const linkEnter = link.enter().append("path")
                .attr("d", (d) => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            });
            // 为转为新位置添加动画
            link.merge(linkEnter).transition(transition)
                .attr("d", diagonal);
            // 将现有节点转换到父节点的新位置
            link.exit().transition(transition).remove()
                .attr("d", (d) => {
                const o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            });
            // 隐藏旧的位置并转换
            root.eachBefore((d) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
            // 自动定位
            // const x = parseInt(source.x), y = parseInt(source.y);
            // let transformStr = `translate(${-y}px, ${-x}px)`,
            //     originTransform = this.svg.style('transform');
            // transformStr = originTransform.replace(OrgTree.MATCH_TRANSLATE_REGEX, transformStr)
            // this.svg.style('transform', transformStr)
        }
        // 初始位置
        initTransform() {
            const scale = 1;
            this.currentScale = scale;
            // const { top, left } = this.config.margin
            // const x = left * scale,
            //     y = top * scale
            this.svg
                .style('transform', `translate(0px, 0px) scale(${scale})`)
                // https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin
                .style('transform-origin', `0 0 0`);
        }
        // 编码
        reEncode(data) {
            return decodeURIComponent(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                const c = String.fromCharCode(+(`0x${p1}`));
                return c === '%' ? '%25' : c;
            }));
        }
        // 计算canvas大小
        calculateCanvasSize() {
            // 浏览器像素比
            const pixelRatio = window.devicePixelRatio || 1;
            // 获取svg的viewBox，从而获取实际大小
            const [minX, minY, width, height] = this.getSvgViewBox();
            const W = parseInt(String(width * pixelRatio)), H = parseInt(String(height * pixelRatio));
            return [W, H];
        }
        // 生成一张Base64
        generateBase64Image(mime, option = {}) {
            const _this = this;
            // 复制svg
            const dupSvg = document.getElementById(OrgTree.SVG_UID).cloneNode(true);
            // 重置transform
            dupSvg.style.transform = `translate(0px, 0px) scale(1)`;
            // 构建一个代表 DOM 树的XML字符串
            // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLSerializer
            const serializer = new XMLSerializer();
            const source = serializer.serializeToString(dupSvg);
            // Base64
            const path = "data:image/svg+xml;base64," + window.btoa(this.reEncode(source));
            // 设置宽高
            const [width, height] = this.calculateCanvasSize();
            // canvas
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            let handler, _exportPath;
            // image
            const img = new Image();
            img.src = path;
            img.onload = function () {
                // 增加底色
                if (option.background) {
                    context.beginPath();
                    context.rect(0, 0, width, height);
                    context.fillStyle = option.background;
                    context.fill();
                    context.closePath();
                }
                //绘制图片
                context.drawImage(img, 0, 0, width, height);
                // console.log('绘制图片', width, height);
                // 添加水印
                let marker = option.watermark || "";
                if (marker) {
                    context.font = _this.config.font;
                    context.fillStyle = "rgba(12, 0, 70, 0.1)";
                    let textWidth = context.measureText(marker).width, textHegith = 200, pk = 2, rotate = (option.rotation || -45) * Math.PI / 180, sinReg = Math.sin(rotate), cosReg = Math.cos(rotate), width = Math.abs(canvas.width * cosReg) + Math.abs(canvas.height * sinReg), height = Math.abs(canvas.height * cosReg) + Math.abs(canvas.width * sinReg);
                    let xf = Math.ceil(width / textWidth * pk);
                    let yf = Math.ceil(height / textHegith);
                    context.rotate(rotate);
                    for (let i = 0; i < yf; i++) {
                        for (let k = 0; k < xf; k++) {
                            context.fillText(marker, textWidth * k * pk - canvas.height * cosReg, textHegith * i);
                        }
                    }
                }
                // resolve
                document.body.appendChild(canvas);
                _exportPath = canvas.toDataURL(mime || 'image/png', 1); // [https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL]
                if (handler instanceof Function)
                    handler(_exportPath);
                document.body.removeChild(canvas);
            };
            return new Promise((resolve) => {
                handler = resolve;
            });
        }
        // 输出为图片
        exportingImage() {
            function downLoad(url, fileName) {
                var oA = document.createElement("a");
                oA.download = fileName || '';
                oA.style.display = 'none';
                oA.href = url;
                document.body.appendChild(oA);
                oA.click();
                oA.remove();
            }
            const img = this.generateBase64Image('', {
                watermark: '无糖信息',
                background: '#fff'
            });
            img === null || img === void 0 ? void 0 : img.then((base64src) => {
                downLoad(base64src, '网络传销人员组织树.png');
            });
        }
    }
    // 正则匹配 translate 属性
    OrgTree.MATCH_TRANSLATE_REGEX = /translate\((-?\d+)px, ?(-?\d+)px\)/i;
    // 正则匹配 scale 属性
    OrgTree.MATCH_SCALE_REGEX = /scale\((\S*)\)/i;
    // 默认配置值
    OrgTree.DEFAULT_CONFIG = {
        duration: 800,
        margin: {
            top: 30,
            right: 200,
            bottom: 30,
            left: 200
        },
        direction: ITreeDirection.VERTICAL,
        linkStyle: ITreeLinkStyle.CURVE,
        dx: 18,
        dy: 400,
        font: "16px 微软雅黑"
    };
    // uid
    OrgTree.SVG_UID = 'org-tree';
    OrgTreeV1.OrgTree = OrgTree;
})(OrgTreeV1 || (OrgTreeV1 = {}));
