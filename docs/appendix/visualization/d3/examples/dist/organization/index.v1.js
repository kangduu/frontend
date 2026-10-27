"use strict";
var OrgTreeV0;
(function (OrgTreeV0) {
    // 线条配置
    let TreeLinkStyle;
    (function (TreeLinkStyle) {
        TreeLinkStyle["CURVE"] = "curve";
        TreeLinkStyle["STRAIGHT"] = "straight";
    })(TreeLinkStyle || (TreeLinkStyle = {}));
    // 方向配置
    let TreeDirection;
    (function (TreeDirection) {
        TreeDirection["VERTICAL"] = "vertical";
        TreeDirection["HORIZONTAL"] = "horizontal";
    })(TreeDirection || (TreeDirection = {}));
    class OrgTree {
        constructor(selector, data, cfg) {
            const { d3, _: lodash } = window;
            this.d3 = d3;
            this.lodash = lodash;
            this.dataset = data;
            this.selector = selector;
            this.config = Object.assign(Object.assign({}, OrgTree.DEFAULT_CONFIG), cfg);
            this.init();
            this.draw();
            this.enableDrag();
            this.enableZoom();
            this.initTransform();
        }
        // 初始化
        init() {
            const { d3, selector, dataset, config } = this;
            this.svg = d3.select(selector.target);
            this.root = d3.hierarchy(dataset);
            this.descendantData = this.root.descendants();
            const { width, height } = this.setSizeSVG();
            const { top, right, bottom, left } = config.margin;
            const innerWidth = width - left - right;
            const innerHeight = height - top - bottom;
            this.g = this.svg.append('g')
                .attr('transform', `translate(${left},${top})`);
            this.root = d3.tree().size([innerHeight, innerWidth])(this.root);
        }
        // SVG动态宽高
        setSizeSVG() {
            const { descendantData } = this;
            // 叶子最多数
            const maxLeaf = (() => {
                const depthCount = {};
                descendantData.forEach((item) => {
                    const { depth } = item;
                    if (depthCount[depth]) {
                        depthCount[depth]++;
                    }
                    else {
                        depthCount[depth] = 1;
                    }
                });
                return Math.max.apply(null, Object.values(depthCount));
            })();
            const depth = this.root.height;
            // 默认一层400，叶子高度24
            let width = (depth + 1) * 400;
            let height = maxLeaf * 24;
            const wrapperWidth = this.d3.select(this.selector.wrapper).node().clientWidth;
            if (width < wrapperWidth)
                width = wrapperWidth;
            this.svg
                .attr('width', width)
                .attr('height', height);
            return { width, height };
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
        // 缩小（最小0.01）
        zoomOut(record) {
            // 如果已有scale属性, 在原基础上修改
            let targetScale = 1 / 1.1;
            const scaleMatchResult = record.match(OrgTree.MATCH_SCALE_REGEX);
            if (scaleMatchResult && scaleMatchResult.length > 0) {
                const originScale = parseFloat(scaleMatchResult[1]);
                targetScale = originScale / 1.2;
            }
            if (targetScale < 0.01)
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
        draw() {
            const { d3, g, root } = this;
            // 颜色生成函数
            const color = d3.scaleOrdinal(d3.schemeCategory10);
            // .domain(root.descendants().filter(d => d.depth <= 1).map(d => d.data.name))
            // .range(d3.schemeCategory10);
            const fill = this.fillColor.bind(this, color);
            // 画线
            g.selectAll('path').data(root.links()).join('path')
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('d', d3.linkHorizontal().x((d) => d.y).y((d) => d.x));
            // 画圆
            g.selectAll('circle').data(root.descendants()).join('circle')
                .attr('cx', (d) => d.y)
                .attr('cy', (d) => d.x)
                .attr('fill', fill)
                .attr('stroke-width', 3)
                .attr('r', 6)
                .style('cursor', 'pointer')
                .on('click', (event, d) => {
                d.children = d.children ? null : d._children;
                console.log(d);
            });
            // 文本
            g.selectAll('text').data(root.descendants()).join('text')
                .attr('font-size', '1em')
                .attr('x', (d) => d.y)
                .attr('y', (d) => d.x)
                .attr("dx", (d) => d.children ? -8 : 8)
                .attr('dy', '0.31em')
                .text((d) => d.data.name)
                .filter((d) => d.children)
                .attr("text-anchor", "end");
        }
        // 初始位置
        initTransform() {
            // 容器
            const wrapper = this.d3.select(this.selector.wrapper).node();
            const wrapperWidth = +(wrapper.clientWidth);
            const wrapperHeight = +(wrapper.clientHeight);
            // svg
            const width = +(this.svg.attr('width'));
            const height = +(this.svg.attr('height'));
            // 设置transform初始值
            // 由于MATCH_TRANSLATE_REGEX匹配\d，所以这里需parseInt一次
            this.svg
                .style('transform', `translate(${0}px, ${parseInt((wrapperHeight / 2) - (height / 2) + '')}px) scale(1)`)
                .style('transform-origin', 'center');
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
        direction: TreeDirection.VERTICAL,
        linkStyle: TreeLinkStyle.CURVE,
        currentScale: 1,
    };
})(OrgTreeV0 || (OrgTreeV0 = {}));
