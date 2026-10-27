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
            const { d3, _: lodash } = window;
            this.d3 = d3;
            this.lodash = lodash;
            this.dataset = data;
            this.selector = selector;
            this.config = Object.assign(Object.assign({}, OrgTree.DEFAULT_CONFIG), cfg);
            this.init();
            this.enableDrag();
            this.enableZoom();
        }
        // 初始化
        init() {
            const { d3, selector, dataset } = this;
            const wrapperElement = d3.select(selector.wrapper);
            const width = wrapperElement.node().clientWidth;
            this.root = d3.hierarchy(dataset);
            const dx = 10, dy = width / (this.root.height + 1);
            this.width = width;
            this.root.x0 = dy / 2;
            this.root.y0 = 0;
            this.dCoords = { dx, dy };
            this.tree = d3.tree().nodeSize([dx, dy]);
            this.diagonal = d3.linkHorizontal().x((d) => d.y).y((d) => d.x);
            // 对子节点数据进行处理，
            this.root.descendants().forEach((d, i) => {
                d.id = i;
                d._children = d.children;
                // 默认通过depth进行控制,
                // 后续可根据d.data属性来配置默认expand值
                if (d.depth && d.depth > 1)
                    d.children = null;
            });
            const { left, top } = this.config.margin;
            const svg = d3.create("svg")
                .attr('id', 'org-tree')
                .attr("viewBox", [-left, -top, width, dx])
                .style("font", "10px sans-serif")
                .style("user-select", "none");
            this.gLink = svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.4)
                .attr("stroke-width", 1.5);
            this.gNode = svg.append("g")
                .attr("cursor", "pointer")
                .attr("pointer-events", "all");
            this.svg = svg;
            // Update 
            this.update(this.root);
            // 将节点添加到body中
            document.body.appendChild(this.svg.node());
            // 
            this.initTransform();
        }
        // 放大（最大5倍）
        zoomIn(record) {
            // 如果已有scale属性, 在原基础上修改
            let targetScale = 1 * 1.2;
            const scaleMatchResult = record.match(OrgTree.MATCH_SCALE_REGEX);
            if (scaleMatchResult && scaleMatchResult.length > 0) {
                const originScale = parseFloat(scaleMatchResult[1]);
                targetScale *= originScale;
            }
            if (targetScale > 4)
                return '';
            return record.replace(OrgTree.MATCH_SCALE_REGEX, `scale(${targetScale})`);
        }
        // 缩小（最小0.5）
        zoomOut(record) {
            // 如果已有scale属性, 在原基础上修改
            let targetScale = 1 / 1.1;
            const scaleMatchResult = record.match(OrgTree.MATCH_SCALE_REGEX);
            if (scaleMatchResult && scaleMatchResult.length > 0) {
                const originScale = parseFloat(scaleMatchResult[1]);
                targetScale = originScale / 1.2;
            }
            if (targetScale < 0.5)
                return '';
            return record.replace(OrgTree.MATCH_SCALE_REGEX, `scale(${targetScale})`);
        }
        // 缩放
        enableZoom(delta) {
            const { d3, lodash, selector, svg } = this;
            const wrapper = d3.select(selector.wrapper);
            // 事件绑定
            const zoomIn = this.zoomIn.bind(this);
            const zoomOut = this.zoomOut.bind(this);
            // 滚轮
            wrapper.on('wheel', lodash.throttle(function (event) {
                const Delta = delta || event.deltaY;
                // 历史记录
                const originTransformStr = svg.style('transform');
                // 新的值
                let newTransform = originTransformStr;
                // 向下滚动（缩小）
                if (Delta > 0) {
                    newTransform = zoomOut(originTransformStr);
                }
                // 向上滚动（放大）
                if (Delta < 0) {
                    newTransform = zoomIn(originTransformStr);
                }
                // 如果返回的是空字符串，便是不需要更新
                if (newTransform !== '' &&
                    newTransform !== originTransformStr) {
                    svg.style('transform', newTransform);
                }
            }, 80));
        }
        // Drag 
        enableDrag() {
            const wrapper = this.d3.select(this.selector.wrapper);
            const { svg, config } = this;
            const currentScale = config.currentScale;
            let isDrag = false, startX = 0, startY = 0, mouseDownTransform = ''; // 保存鼠标点下时的位移
            // 鼠标按下
            wrapper.on('mousedown', function (event) {
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
                let newX = Math.floor((event.clientX - startX) / currentScale) + originOffsetX;
                let newY = Math.floor((event.clientY - startY) / currentScale) + originOffsetY;
                let transformStr = `translate(${newX}px, ${newY}px)`;
                if (originTransform && originTransform !== 'none') {
                    transformStr = originTransform.replace(OrgTree.MATCH_TRANSLATE_REGEX, transformStr);
                }
                svg.style("transform", transformStr);
            }, 80));
            // 鼠标离开
            wrapper.on('mouseup', function () {
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
        // 更新视图
        update(source) {
            const { d3, root, tree, svg, width, gLink, gNode, diagonal } = this;
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
            let leftRoot = root;
            let rightRoot = root;
            root.eachBefore((node) => {
                if (node.x < leftRoot.x)
                    leftRoot = node;
                if (node.x > rightRoot.x)
                    rightRoot = node;
            });
            const { top, bottom, left, right } = this.config.margin;
            const height = rightRoot.x - leftRoot.x + top + bottom;
            const transition = svg.transition()
                .duration(duration)
                .attr("viewBox", [-left, leftRoot.x - top, width, height])
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
                .attr('r', 4)
                // .attr("fill", (d: any) => d._children ? "#555" : "#999")
                // .attr("stroke-width", 10)
                .attr("fill", fill)
                .style('cursor', 'pointer')
                .style('opacity', (d) => d._children ? "1" : "0.6");
            // 设置文本
            nodeEnter.append("text")
                .attr("dy", "0.31em")
                .attr("x", (d) => d._children ? -6 : 6)
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
        }
        // 初始位置
        initTransform() {
            this.svg
                .style('transform', `translate(0px, 0px) scale(1.5)`)
                // https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin
                .style('transform-origin', '0 0 0');
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
            top: 50,
            right: 200,
            bottom: 50,
            left: 200
        },
        direction: ITreeDirection.VERTICAL,
        linkStyle: ITreeLinkStyle.CURVE,
        currentScale: 1,
    };
    OrgTreeV1.OrgTree = OrgTree;
})(OrgTreeV1 || (OrgTreeV1 = {}));
