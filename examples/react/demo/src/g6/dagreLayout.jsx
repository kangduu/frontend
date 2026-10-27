import React, { Component } from "react";
import G6 from "@antv/g6";
import MockData from "./data";
import "./styles.less";

const color = "#198efa";

G6.registerNode(
  "card-node",
  {
    // ! 这个options，可以在那些生命周期获取，可用来做什么？
    // options: {
    //   style: {
    //     fill: "red",
    //   },
    //   stateStyles: {
    //     hover: {
    //       stroke: "#198efa",
    //     },
    //     selected: {},
    //   },
    // },

    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中的图形对象的容器
     * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
     */
    draw(cfg, group) {
      const r = 4;
      const w = cfg.size[0];
      const h = cfg.size[1];

      const rectShape = group.addShape("rect", {
        attrs: {
          x: -w / 2,
          y: -h / 2,
          width: w,
          height: h,
          radius: r,
          stroke: "transparent",
          fill: "#ffffff",
          shadowOffsetX: 0,
          shadowOffsetY: 5,
          shadowColor: "rgba(21, 21, 21, 0.07)",
          shadowBlur: 40,
        },
        name: "rect-shape",
        draggable: true,
      });

      cfg.children &&
        group.addShape("marker", {
          attrs: {
            x: w / 2 + 15,
            y: 0,
            r: 10,
            cursor: "pointer",
            symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
            lineWidth: 1,
            stroke: "#fff",
            fill: "#cccccc",
            shadowOffsetX: 0,
            shadowOffsetY: 5,
            shadowColor: "rgba(21, 21, 21, 0.07)",
            shadowBlur: 40,
          },
          name: "collapse-icon",
        });

      if (cfg.label) {
        // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        const label = group.addShape("text", {
          // attrs: style
          attrs: {
            x: 0, // 居中
            y: 0,
            textAlign: "center",
            textBaseline: "middle",
            text: cfg.label,
            fill: "#666",
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: "text-shape",
          // 设置 draggable 以允许响应鼠标的图拽事件
          draggable: true,
        });
      }

      return rectShape;
    },
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get("children")[0]; // 顺序根据 draw 时确定
      if (name === "hover" || name === "selected") {
        if (value) {
          shape.attr("stroke", color);
        } else {
          if (!item.hasState("selected")) shape.attr("stroke", "transparent");
        }
      }
      if (name === "collapsed") {
        const marker = item
          .get("group")
          .find((ele) => ele.get("name") === "collapse-icon");
        const icon = value ? G6.Marker.expand : G6.Marker.collapse;
        marker.attr("symbol", icon);
      }
    },
    getAnchorPoints() {
      return [
        [0, 0.3],
        [0, 0.5],
        [0, 0.7],
        [1, 0.3],
        [1, 0.5],
        [1, 0.7],
      ];
    },
  }
  // 继承内置节点类型的名字，例如基类 'single-node'，或 'circle', 'rect' 等
  // 当不指定该参数则代表不继承任何内置节点类型
  //   "modelRect"
);

// path direction
function getDirection({ startPoint, endPoint }) {
  if (startPoint && endPoint) {
    let direction = 1;
    const { x: sx } = startPoint,
      { x: ex } = endPoint;

    if (sx > ex) direction = -1;
    return direction;
  }
  return 0;
}

function getEdgeColor(cfg) {
  // edge color
  const EdgeColor = "#e78686";
  const EdgeHighlightColor = "#ff4d4f";

  // inverse edge color
  const EdgeInverseColor = "#82d4b6";
  const EdgeHighlightInverseColor = "#43f2b2";

  const direction = getDirection(cfg);

  const color =
    direction > 0
      ? {
          color: EdgeColor,
          highlightColor: EdgeHighlightColor,
          endArrow: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeColor,
            d: 0,
          },
          endArrowHighlight: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeHighlightColor,
            d: 0,
          },
        }
      : {
          color: EdgeInverseColor,
          highlightColor: EdgeHighlightInverseColor,
          endArrow: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeInverseColor,
            d: 0,
          },
          endArrowHighlight: {
            path: G6.Arrow.triangle(15, 11, 0),
            fill: EdgeHighlightInverseColor,
            d: 0,
          },
        };

  return color;
}

function customEdge(cfg) {
  const { startPoint, endPoint } = cfg;
  const direction = getDirection(cfg);
  const { x: sx, y: sy } = startPoint,
    { x: ex, y: ey } = endPoint;
  const s_d = 30,
    e_d = 10;

  // arrow right
  if (direction > 0) {
    if (Math.abs(ey - sy) < 40) {
      // a half of node height
      return [
        ["M", sx + s_d, sy],
        ["L", ex - e_d, sy],
      ];
    }

    if (ex - sx > 212 + 140) {
      const s = ey - sy >= 0 ? -1 : +1;
      return [
        ["M", sx + s_d, sy],
        ["L", sx + 2 * s_d, sy],
        ["L", sx + 2 * s_d, ey + s * 40],
        ["L", ex - e_d, ey + s * 40],
      ];
    }
    return [
      ["M", sx + s_d, sy],
      ["L", sx + 2 * s_d, sy],
      ["L", sx + 2 * s_d, ey],
      ["L", ex - e_d, ey],
    ];
  }
  // arrow left
  else {
    const s = ey - sy >= 0 ? 1 : -1;
    return [
      ["M", sx + s_d, sy],
      ["L", sx + 2 * s_d, sy],
      ["L", sx + 2 * s_d, ey + s * 48],
      ["L", ex + 2 * s_d + 10, ey + s * 48],
    ];
  }
}
G6.registerEdge(
  "card-edge",
  {
    draw(cfg, graph) {
      const { color } = getEdgeColor(cfg);
      const keyShape = graph.addShape("path", {
        attrs: {
          startArrow: null,
          endArrow: {
            path: G6.Arrow.triangle(10, 10, 0),
            fill: color,
            radius: true,
            lineDash: [],
            d: 0,
          },
          path: customEdge(cfg),
          stroke: color,
          lineWidth: 2,
          lineAppendWidth: 10,
        },
        name: "path-shape",
      });

      return keyShape;
    },
    setState(name, value, item) {
      const shape = item.get("keyShape");
      // 流入动画
      if (name === "running") {
        if (value) {
          let index = 0;
          shape.animate(
            () => {
              index++;
              if (index > 9) {
                index = 0;
              }
              const res = {
                lineDash: [8, 4, 2, 4],
                lineDashOffset: -index,
              };
              // return the params for this frame
              return { ...res, lineWidth: 4 };
            },
            {
              repeat: true,
              duration: 1000,
            }
          );
        } else {
          shape.stopAnimate();
          shape.attr("lineDash", null);
          shape.attr("lineWidth", 2);
        }
      }
    },
  }
  // "polyline"
);

class IndentManager {
  // 获取满足添加的子元素
  getSons(data, collapsed) {
    const hasHideInEdges = (edges) => edges.every((edge) => !edge.isVisible());
    const getInEdgesAtLeft = (node) =>
      node.getInEdges().filter((edge) => {
        const { direction } = edge.getModel();
        return direction > 0;
      });
    if (collapsed) {
      return data.filter((item) => {
        const inEdges = getInEdgesAtLeft(item);
        return inEdges.length === 1 || hasHideInEdges(inEdges);
      });
    }
    return data;
  }

  // 获取目标节点右侧的邻居
  getNeighborsAtRight(node) {
    const { x } = node.getModel();
    return node.getNeighbors("target").filter((item) => {
      const { x: rx } = item.getModel();
      return rx > x;
    });
  }

  // 获取目标节点左侧的父节点
  getParentsAtLeft(node) {
    let parents = [];

    function getNeighborsAtLeft(node, container) {
      if (!node) return;
      const { x } = node.getModel();
      node.getNeighbors("source").forEach((item) => {
        const { x: ix } = item.getModel();
        if (ix < x) {
          container.push(item);
          getNeighborsAtLeft(item, container);
        }
      });
    }

    getNeighborsAtLeft(node, parents);
    parents.push(node);

    return parents;
  }

  // 改变节点的可见性
  getChangeVisibilityOfNode(node) {
    if (!node) return null;
    const resultNode = [];

    const { collapsed } = node.getModel();

    let ancestor = this.getParentsAtLeft(node);
    const sons = this.getNeighborsAtRight(node);
    let toggleNodes = this.getSons(sons, collapsed);
    let son = toggleNodes.shift();

    while (son) {
      const { id } = son.getModel();
      if (ancestor.some((item) => item.getModel().id === id)) {
        son = toggleNodes.shift();
        continue;
      }

      ancestor.push(son);

      // 必须先设置 visible
      son.getOutEdges().forEach((edge) => {
        edge.changeVisibility(!collapsed);
      });

      const targets = this.getNeighborsAtRight(son);
      if (Array.isArray(targets) && targets.length > 0) {
        const subNodes = this.getSons(targets, collapsed);
        toggleNodes.push(...subNodes);
      }

      resultNode.push(son);
      son = toggleNodes.shift();
    }

    return resultNode;
  }
}

export default class DemoTree extends Component {
  indentManager = new IndentManager();
  ref = React.createRef();
  // 【折叠】点击 marker 触发
  indentGraph = (e) => {
    try {
      const node = e.item;
      const { collapsed } = node.getModel();

      // e.item.getOutEdges 显示修改
      node.getOutEdges().forEach((edge) => {
        edge.changeVisibility(!collapsed); // 必须先设置 visible
      });

      this.indentManager.getChangeVisibilityOfNode(node).forEach((node) => {
        node.changeVisibility(!collapsed);

        if (node.hasState("collapsed") && collapsed) {
          node.getModel().collapsed = false;
          node.setState("collapsed", false);
        }
      });
    } catch (error) {
      console.log("indent error", error);
    }
  };

  clearNodeState(state, ignoreNodes = []) {
    const hasStateNodes = this.graph.findAllByState("node", state);
    const ids = ignoreNodes.map((item) => item.getModel().id);

    hasStateNodes.forEach((node) => {
      const { id } = node.getModel();
      if (ids.indexOf(id) === -1) node.setState(state, false);
    });
  }

  clearEdgeState(state, ignoreEdges = []) {
    const hasStateEdges = this.graph.findAllByState("edge", state);
    const ids = ignoreEdges.map((item) => item.getModel().id);

    hasStateEdges.forEach((edge) => {
      const { id } = edge.getModel();
      if (ids.indexOf(id) === -1) edge.setState(state, false);
    });
  }

  // 设置节点相关边的动画
  setNodeEdgesRunning = (node) => {
    const edges = node.getEdges();
    edges.forEach((edge) => {
      if (!edge.hasState("running")) edge.setState("running", true);
    });
    this.clearEdgeState("running", edges);
  };

  bindEventForGraph(graph) {
    graph.on("afterrender", () => {
      graph.getEdges().forEach((edge) => {
        if (edge) {
          const direction = getDirection(edge.getModel());
          edge.update({ direction });
        }
      });
      // graph.getNodes().forEach((node) => {
      //   console.log(node.getInEdges());
      // });
    });

    graph.on("node:click", (e) => {
      const node = e.item;
      if (e.target.get("name") === "collapse-icon") {
        node.getModel().collapsed = !node.getModel().collapsed;
        graph.setItemState(node, "collapsed", node.getModel().collapsed);
        // 折叠
        this.indentGraph(e);
      } else if (!node.hasState("selected")) {
        node.setState("selected", true);
        this.clearNodeState("selected", [node]);

        this.setNodeEdgesRunning(node);
      }
    });

    // 鼠标移动到上面 running，移出结束
    graph.on("node:mouseenter", (e) => {
      const node = e.item;
      if (e.target.get("name") === "rect-shape") {
        graph.setItemState(node, "hover", true);
      }
    });

    graph.on("node:mouseleave", (e) => {
      const node = e.item;
      graph.setItemState(node, "hover", false);
    });

    graph.on("edge:mouseenter", (e) => {
      const edge = e.item;
      !edge.hasState("running") && edge.setState("running", true);
    });

    graph.on("edge:mouseleave", (e) => {
      const edge = e.item;
      const sourceNode = edge.getSource();
      const targetNode = edge.getTarget();
      if (
        !sourceNode.hasState("selected") &&
        !targetNode.hasState("selected")
      ) {
        edge.setState("running", false);
      }
    });
  }

  renderGraph(container) {
    if (!container) return;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    const graph = new G6.Graph({
      container,
      width,
      height,
      fitView: false,
      fitCenter: true,
      fitViewPadding: 40,
      modes: {
        default: ["drag-canvas", "zoom-canvas"],
      },
      defaultNode: {
        size: [212, 95],
        type: "card-node",
      },
      defaultEdge: {
        type: "card-edge",
        sourceAnchor: 4,
      },
      layout: {
        type: "dagre",
        rankdir: "LR",
        align: "UL",
        controlPoints: true,
        nodesepFunc: () => 30,
        ranksepFunc: () => 140,
      },
      plugins: [new G6.Minimap()],
    });

    graph.read(MockData);

    this.graph = graph;

    this.bindEventForGraph(graph);
  }
  componentDidMount() {
    this.renderGraph(this.ref.current);
  }
  render() {
    return (
      <div
        ref={this.ref}
        style={{
          width: "100%",
          height: "800px",
          margin: "0 auto",
          border: "1px solid",
          position: "relative",
        }}
      />
    );
  }
}
