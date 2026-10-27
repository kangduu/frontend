// 从window上获取d3,mockjs,lodash等
const _win = (window as any)

// 线条配置
enum TreeLinkStyle {
    CURVE = 'curve', // 曲线
    STRAIGHT = 'straight', // 直线
}

// 方向配置
enum TreeDirection {
    VERTICAL = 'vertical', //垂直
    HORIZONTAL = 'horizontal', // 水平
}

// 参数配置
interface ITreeConfig {
    direction?: TreeDirection;
    linkStyle?: TreeLinkStyle;
    [propName: string]: any
}

// 数据格式
interface IData {
    id: string;
    name: string;
    children?: IData[];
    [propName: string]: any;
}

// params 
interface IOptions {
    data: IData[];
    wrapper?: Node;
    collapsible?: boolean;
    zoom?: boolean;
}


/**
 * @name HierarchyTree（层级结构树）
 * 
 */
class HierarchyTree {
    // 默认配置值
    config = {
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
    }

    // 数据
    data: IData[]
    // hierarchy
    root: any

    // g
    gRoot: any
    gLink: any
    gNode: any

    svg: any
    zoom: any
    tree: any
    diagonal: any

    parentNode: HTMLElement

    constructor(options: IOptions) {
        // 父节点 默认为 body
        this.parentNode = options.wrapper || _win.document.querySelector("body");
        // data
        this.data = options.data;

        // 初始化
        this.init()

        // update
        this.update(this.root)

        // 挂载渲染
        this.render()
    }

    // 初始化，方法内部执行顺序有严格的要求，避免取值为空。
    init() {
        // root
        this.root = this.handleHierarchyData(this.data)

        // tree
        this.tree = this.generateTree()

        // diagonal : linkHorizontal, linkVertical, 
        this.diagonal = _win.d3.linkVertical()
            .x((d: any) => d.x)
            .y((d: any) => d.y);

        // svg实列

        this.svg = this.initSVG()

        // g 分组
        const [gRoot, gLink, gNode] = this.initGroup()
        this.gRoot = gRoot
        this.gLink = gLink
        this.gNode = gNode

        // zoom
        this.zoom = this.bindZoom()
        this.svg.call(this.zoom)
    }

    // 获取父元素大小
    getSizeParent(): { width: number, height: number } {
        // 父节点（显示尺寸大小）
        const { parentNode } = this
        const width = parentNode.clientWidth;
        const height = parentNode.clientHeight;
        return { width, height }
    }


    // 获取 viewBox 值
    getViewBox(): number[] {
        const { width, height } = this.getSizeParent()

        const initScale = 2;

        const W = width * initScale,
            H = height * initScale,
            Left = W / initScale,
            Top = 100;

        return [-Left, -Top, W, H]
    }

    // 创建SVG
    initSVG(): any {
        const { width, height } = this.getSizeParent()

        const svg = _win.d3.create("svg")
            .attr("id", "svg-tree__hierarchy")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", this.getViewBox())
            .style("user-select", "none");

        return svg
    }

    // 生成树结构
    generateTree() {
        const tree = _win.d3.tree()
            .nodeSize([300, 200])
            .separation(function (a: any, b: any) {
                return (a.parent == b.parent ? 3 : 4) / a.depth;
            })

        return tree
    }

    // g-group
    initGroup(): any[] {
        const gRoot = this.svg.append("g")
            .attr("id", "g-root");

        const gLink = gRoot.append("g")
            .attr("id", "g-link")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.7);

        const gNode = gRoot.append("g")
            .attr("id", "g-node")
            .attr("pointer-events", "all") // [pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/pointer-events)
            .attr("cursor", "pointer");

        return [gRoot, gLink, gNode]
    }

    // 对数据进行层级化处理
    handleHierarchyData(data: IData[]) {
        const root = _win.d3.hierarchy(data)

        root.x0 = 0;
        root.y0 = 0;

        root.descendants()
            .forEach(function (d: any) {
                d._children = d.children
            })

        return root
    }


    // 绑定zoom模块
    bindZoom(): any {
        const gRoot = this.gRoot
        const zoom = _win.d3.zoom()
            // .extent()
            .scaleExtent([0.5, 5])
            // .translateExtent()
            // .on("start", function (event: Node, d: any) { })
            .on("zoom", function ({ transform }: { transform: any }) {
                gRoot.attr("transform", transform)
            })
        // .on("end", function (event: Node, d: any) { })
        return zoom
    }


    dynamicNodeAndLink() {

    }

    update(source: any) {
        const { d3 } = _win
        this.tree(this.root)

        var boxWidth = 300, boxHeight = 150;


        const duration = d3.event && d3.event.altKey ? 1000 : 300
        const transtion = this.svg.transition()
            .duration(duration)
            .attr("viewBox", this.getViewBox())
            .tween("resize", window.ResizeObserver ? null : () => () => this.svg.dispatch("toggle"));


        const digaonal = (d: any) => {
            let sourceX = d.source.x,
                sourceY = d.source.y + boxHeight,
                targetX = d.target.x,
                targetY = d.target.y;

            return "M" + sourceX + "," + sourceY +
                "V" + ((targetY - sourceY) / 2 + sourceY) +
                "H" + targetX +
                "V" + targetY;
        }

        // line

        const link = this.gLink.selectAll("path")
            .data(this.root.links(), (d: any) => d.target.id)

        const linkEnter = link.enter().append("path")
            .attr("fill", "none")
            // .attr("stroke", "black")
            // .attr("d", this.diagonal)
            .attr("d", digaonal)

        link.merge(linkEnter).transition(transtion)
            .attr("d", digaonal);

        link.exit().transition(transtion).remove()
            .attr("d", digaonal);

        // 内容

        const node = this.gNode.selectAll("foreignObject")
            .data(this.root.descendants(), (d: any) => d.data.id);

        const update = this.update.bind(this)
        const nodeEnter = node.enter().append("foreignObject")
            // .attr("transform", "translate(0,0)")
            .attr("x", (d: any) => source.x0 - boxWidth / 2)
            .attr("y", (d: any) => source.y0)
            .attr("width", boxWidth)
            .attr("height", boxHeight)
            .on("click", _win._.debounce(function (event: Event, d: any) {
                event.preventDefault()
                if (!Array.isArray(d._children) || d._children.length === 0) return
                console.log("click")
                d.children = d.children ? null : d._children
                update(d)
            }, 300))
            .on("contextmenu", function (event: Event, d: any) {
                event.preventDefault()
                alert("contextmenu")
            })

        nodeEnter.append("xhtml:div")
            .classed("people-item", true)
            .style("width", "100%")
            .style("height", "100%")
            .html(function (d: any) {
                const { name, id } = d.data
                const { depth, height, x, y } = d
                return `
                <p>#${depth}${name}</p>
                <p>ID：${id}</p>
                `
            })

        node.merge(nodeEnter).transition(transtion)
            .attr("x", (d: any) => d.x - boxWidth / 2)
            .attr("y", (d: any) => d.y);

        node.exit().transition(transtion).remove()
            .attr("x", (d: any) => source.x - boxHeight / 2)
            .attr("y", (d: any) => d.parent.y);


        // 更新x y
        this.root.eachBefore((d: any) => {
            d.x0 = d.x
            d.y0 = d.y
        })
    }

    // 将创建的SVG添加到指定的父节点中
    render() {
        const ParentNode = _win.document.querySelector("body")
        const OldChild = _win.document.querySelector("svg#root")
        const TargetNode = this.svg?.node()

        if (!TargetNode) return null

        if (OldChild) return ParentNode?.replaceChild(TargetNode, OldChild)

        const FirstChild: Node | null = ParentNode?.firstChild || null

        return ParentNode?.insertBefore(TargetNode, FirstChild)
    }
}