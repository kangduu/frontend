"use strict";
// 从window上获取d3,mockjs,lodash等
var _win = window;
// 线条配置
var TreeLinkStyle;
(function (TreeLinkStyle) {
    TreeLinkStyle["CURVE"] = "curve";
    TreeLinkStyle["STRAIGHT"] = "straight";
})(TreeLinkStyle || (TreeLinkStyle = {}));
// 方向配置
var TreeDirection;
(function (TreeDirection) {
    TreeDirection["VERTICAL"] = "vertical";
    TreeDirection["HORIZONTAL"] = "horizontal";
})(TreeDirection || (TreeDirection = {}));
/**
 * @name HierarchyTree（层级结构树）
 *
 */
var HierarchyTree = /** @class */ (function () {
    function HierarchyTree(options) {
        // 默认配置值
        this.config = {
            // 过渡延迟
            duration: 600,
            // 可视区域安全边界
            margin: {
                top: 120,
                right: 60,
                bottom: 120,
                left: 60
            },
            // 默认横向
            direction: TreeDirection.VERTICAL,
            // 默认曲线
            linkStyle: TreeLinkStyle.CURVE,
            dx: 18,
            dy: 200,
            font: "16px 微软雅黑"
        };
        // 父节点 默认为 body
        this.parentNode = options.wrapper || _win.document.querySelector("body");
        // data
        this.data = options.data;
        // 初始化
        this.init();
        // update
        this.update(this.root);
        // 挂载渲染
        this.render();
    }
    // 初始化，方法内部执行顺序有严格的要求，避免取值为空。
    HierarchyTree.prototype.init = function () {
        // root
        this.root = this.handleHierarchyData(this.data);
        // tree
        this.tree = this.generateTree();
        // diagonal : linkHorizontal, linkVertical, 
        this.diagonal = _win.d3.linkVertical()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });
        // svg实列
        this.svg = this.initSVG();
        // g 分组
        var _a = this.initGroup(), gRoot = _a[0], gLink = _a[1], gNode = _a[2];
        this.gRoot = gRoot;
        this.gLink = gLink;
        this.gNode = gNode;
        // zoom
        this.zoom = this.bindZoom();
        this.svg.call(this.zoom);
    };
    // 获取父元素大小
    HierarchyTree.prototype.getSizeParent = function () {
        // 父节点（显示尺寸大小）
        var parentNode = this.parentNode;
        var width = parentNode.clientWidth;
        var height = parentNode.clientHeight;
        return { width: width, height: height };
    };
    // 获取 viewBox 值
    HierarchyTree.prototype.getViewBox = function () {
        var _a = this.getSizeParent(), width = _a.width, height = _a.height;
        var initScale = 2;
        var W = width * initScale, H = height * initScale, Left = W / initScale, Top = 100;
        return [-Left, -Top, W, H];
    };
    // 创建SVG
    HierarchyTree.prototype.initSVG = function () {
        var _a = this.getSizeParent(), width = _a.width, height = _a.height;
        var svg = _win.d3.create("svg")
            .attr("id", "svg-tree__hierarchy")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", this.getViewBox())
            .style("user-select", "none");
        return svg;
    };
    // 生成树结构
    HierarchyTree.prototype.generateTree = function () {
        var tree = _win.d3.tree()
            .nodeSize([300, 200])
            .separation(function (a, b) {
            return (a.parent == b.parent ? 3 : 4) / a.depth;
        });
        return tree;
    };
    // g-group
    HierarchyTree.prototype.initGroup = function () {
        var gRoot = this.svg.append("g")
            .attr("id", "g-root");
        var gLink = gRoot.append("g")
            .attr("id", "g-link")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.7);
        var gNode = gRoot.append("g")
            .attr("id", "g-node")
            .attr("pointer-events", "all") // [pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/pointer-events)
            .attr("cursor", "pointer");
        return [gRoot, gLink, gNode];
    };
    // 对数据进行层级化处理
    HierarchyTree.prototype.handleHierarchyData = function (data) {
        var root = _win.d3.hierarchy(data);
        root.x0 = 0;
        root.y0 = 0;
        root.descendants()
            .forEach(function (d) {
            d._children = d.children;
        });
        return root;
    };
    // 绑定zoom模块
    HierarchyTree.prototype.bindZoom = function () {
        var gRoot = this.gRoot;
        var zoom = _win.d3.zoom()
            // .extent()
            .scaleExtent([0.5, 5])
            // .translateExtent()
            // .on("start", function (event: Node, d: any) { })
            .on("zoom", function (_a) {
            var transform = _a.transform;
            gRoot.attr("transform", transform);
        });
        // .on("end", function (event: Node, d: any) { })
        return zoom;
    };
    HierarchyTree.prototype.dynamicNodeAndLink = function () {
    };
    HierarchyTree.prototype.update = function (source) {
        var _this = this;
        var d3 = _win.d3;
        this.tree(this.root);
        var boxWidth = 300, boxHeight = 150;
        var duration = d3.event && d3.event.altKey ? 1000 : 300;
        var transtion = this.svg.transition()
            .duration(duration)
            .attr("viewBox", this.getViewBox())
            .tween("resize", window.ResizeObserver ? null : function () { return function () { return _this.svg.dispatch("toggle"); }; });
        var digaonal = function (d) {
            var sourceX = d.source.x, sourceY = d.source.y + boxHeight, targetX = d.target.x, targetY = d.target.y;
            return "M" + sourceX + "," + sourceY +
                "V" + ((targetY - sourceY) / 2 + sourceY) +
                "H" + targetX +
                "V" + targetY;
        };
        // line
        var link = this.gLink.selectAll("path")
            .data(this.root.links(), function (d) { return d.target.id; });
        var linkEnter = link.enter().append("path")
            .attr("fill", "none")
            // .attr("stroke", "black")
            // .attr("d", this.diagonal)
            .attr("d", digaonal);
        link.merge(linkEnter).transition(transtion)
            .attr("d", digaonal);
        link.exit().transition(transtion).remove()
            .attr("d", digaonal);
        // 内容
        var node = this.gNode.selectAll("foreignObject")
            .data(this.root.descendants(), function (d) { return d.data.id; });
        var update = this.update.bind(this);
        var nodeEnter = node.enter().append("foreignObject")
            // .attr("transform", "translate(0,0)")
            .attr("x", function (d) { return source.x0 - boxWidth / 2; })
            .attr("y", function (d) { return source.y0; })
            .attr("width", boxWidth)
            .attr("height", boxHeight)
            .on("click", _win._.debounce(function (event, d) {
            event.preventDefault();
            if (!Array.isArray(d._children) || d._children.length === 0)
                return;
            console.log("click");
            d.children = d.children ? null : d._children;
            update(d);
        }, 300))
            .on("contextmenu", function (event, d) {
            event.preventDefault();
            alert("contextmenu");
        });
        nodeEnter.append("xhtml:div")
            .classed("people-item", true)
            .style("width", "100%")
            .style("height", "100%")
            .html(function (d) {
            var _a = d.data, name = _a.name, id = _a.id;
            var depth = d.depth, height = d.height, x = d.x, y = d.y;
            return "\n                <p>#" + depth + name + "</p>\n                <p>ID\uFF1A" + id + "</p>\n                ";
        });
        node.merge(nodeEnter).transition(transtion)
            .attr("x", function (d) { return d.x - boxWidth / 2; })
            .attr("y", function (d) { return d.y; });
        node.exit().transition(transtion).remove()
            .attr("x", function (d) { return source.x - boxHeight / 2; })
            .attr("y", function (d) { return d.parent.y; });
        // 更新x y
        this.root.eachBefore(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };
    // 将创建的SVG添加到指定的父节点中
    HierarchyTree.prototype.render = function () {
        var _a;
        var ParentNode = _win.document.querySelector("body");
        var OldChild = _win.document.querySelector("svg#root");
        var TargetNode = (_a = this.svg) === null || _a === void 0 ? void 0 : _a.node();
        if (!TargetNode)
            return null;
        if (OldChild)
            return ParentNode === null || ParentNode === void 0 ? void 0 : ParentNode.replaceChild(TargetNode, OldChild);
        var FirstChild = (ParentNode === null || ParentNode === void 0 ? void 0 : ParentNode.firstChild) || null;
        return ParentNode === null || ParentNode === void 0 ? void 0 : ParentNode.insertBefore(TargetNode, FirstChild);
    };
    return HierarchyTree;
}());
