const data = {
  nodes: [
    {
      id: "1",
      label: "1",
    },
    {
      id: "2",
      label: "2",
    },
    {
      id: "3",
      label: "3",
    },
    {
      id: "4",
      label: "4",
    },
    {
      id: "5",
      label: "5",
    },
    {
      id: "6",
      label: "6",
    },
    {
      id: "7",
      label: "7",
    },
    {
      id: "8",
      label: "8",
    },
  ],
  edges: [
    {
      source: "1",
      target: "2",
    },
    {
      source: "1",
      target: "3",
    },
    {
      source: "3",
      target: "4",
    },
    {
      source: "3",
      target: "5",
    },
    {
      source: "5",
      target: "3",
    },
    {
      source: "5",
      target: "1",
    },
    {
      source: "5",
      target: "2",
    },
    {
      source: "1",
      target: "8",
    },
    {
      source: "6",
      target: "4",
    },
    {
      source: "7",
      target: "5",
    },
    {
      source: "6",
      target: "3",
    },
    {
      source: "6",
      target: "2",
    },
    {
      source: "1",
      target: "5",
    },
    {
      source: "4",
      target: "5",
    },
    {
      source: "6",
      target: "1",
    },
    {
      source: "4",
      target: "2",
    },
    {
      source: "1",
      target: "2",
    },
    {
      source: "3",
      target: "2",
    },
  ],
};

function handleData(data) {
  const { nodes, edges } = data;

  let parents = new Map(),
    children = new Map();

  edges.forEach((edge) => {
    const { source, target } = edge;

    const _parents = parents.get(target);
    if (_parents) {
      if (!_parents.some((item) => item === source))
        parents.set(target, [..._parents, source]);
    } else {
      parents.set(target, [source]);
    }

    const _children = parents.get(source);
    if (_children) {
      if (!_children.some((item) => item === target))
        children.set(source, [..._children, target]);
    } else {
      children.set(source, [target]);
    }
  });

  nodes.forEach((node) => {
    return Object.assign(node, {
      children: children.get(node.id),
      parents: parents.get(node.id),
    });
  });
}

handleData(data);

export default data;
