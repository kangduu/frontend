import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { createContainer, getContainer } from './container';
import { DefaultDuration } from './vendor';

export type NodeItem = {
  id: string;
  message: ReactNode;
  type: MessageTypes;
  children: HTMLSpanElement;
  duration?: number | undefined;
  timer?: NodeJS.Timeout;
};

export type NodeListMap = Map<string, NodeItem>;

// 设置唯一的key
function setUniKey(): string {
  const key = new Date().getTime();
  return 'msg_' + key;
}

class NodeList {
  private static instance: NodeList;
  public list: Set<NodeItem>;
  public container: HTMLElement;

  constructor() {
    this.container = getContainer() || createContainer();
    this.list = new Set();
    this.mount();

    // 单列模式
    if (!NodeList.instance) {
      NodeList.instance = this;
    }
    return NodeList.instance;
  }

  mount() {
    const _this = this;
    window.addEventListener('load', function () {
      document.body.appendChild(_this.container);
    });
  }

  append(data: Omit<NodeItem, 'id' | 'children'>): NodeItem {
    const _id = setUniKey();
    const sandbox = this.__createSpanElement(_id);
    const node = { ...data, id: _id, children: sandbox };
    this.list.add(node);
    return node;
  }

  remove(node: NodeItem) {
    ReactDOM.unmountComponentAtNode(node.children);
    this.list.delete(node);
    // remove span
    if (node.children) this.container.removeChild(node.children);
  }

  addRemoveListener(node: NodeItem) {
    node.timer = setTimeout(
      this.remove.bind(this, node),
      node.duration || DefaultDuration,
    );
  }

  __createSpanElement(id: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.setAttribute('id', id);
    this.container.appendChild(span);
    return span;
  }
}

export default NodeList;
