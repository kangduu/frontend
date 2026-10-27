"use strict";
(function (window) {
    const D3 = window.d3;
    // mock data
    const Mock = window.Mock;
    const mockData = {
        "name": Mock.Random.name(),
        "children": new Array(20).fill(1).map(() => {
            return Mock.mock({
                "name": Mock.Random.name(),
                "children": new Array(Math.ceil(Math.random() * 50)).fill(1).map(() => {
                    return Mock.mock({
                        "name": Mock.Random.name(),
                        "children": []
                    });
                })
            });
        })
    };
    const size = { width: 5000, height: 900 };
    // 设置宽高和定义试图组
    const svg = D3.select('svg.chart')
        .attr('width', size.width)
        .attr('height', size.height)
        .attr("draggable", true);
    const g = svg.append('g').attr('transform', 'translate(0, 20)');
    // 处理为层级数据
    const hierarchyData = D3.hierarchy(mockData);
    // 布局
    const treeLayout = D3.tree()
        .size([size.width - 30, size.height - 30])
        .separation((a, b) => {
        // 根据是否为同一父节点设置节点距离比例
        return a.parent === b.parent ? 1 : 2;
    });
    // 节点数据
    const nodesData = treeLayout(hierarchyData);
    // 画线
    const lines = g.selectAll('.links')
        .data(nodesData.descendants().slice(1)) //nodesData.descendants()返回所有节点的数据，利于我们绑定数据，slcie(1)截取root后的全部节点，防止重绘
        .enter().append('path') //用path画线
        .attr('fill', 'none')
        .attr('stroke', '#313131')
        .attr('stroke-width', 2)
        .attr('d', (d) => {
        return `
                M${d.x},${d.y}
                C${d.x},${(d.y + d.parent.y) / 2}
                ${d.parent.x},${(d.y + d.parent.y) / 2.5}
                ${d.parent.x},${d.parent.y}
            `;
    });
    //当一个节点中有多个子元素时(比如本例中有text和circle) 
    const nodes = g.selectAll('.node')
        .data(nodesData.descendants()) //同样是获得所有节点，便于数据绑定
        .enter().append('g')
        .attr('transform', (d) => {
        return `translate(${d.x}, ${d.y})`; //位移
    });
    //画圆 
    nodes.append('circle')
        .style('fill', '#c03027')
        .attr('r', 10);
    //插入文字
    nodes.append('text')
        .attr('dx', '.9em')
        .text((d) => {
        return d.data.name;
    });
})(window);
