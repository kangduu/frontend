import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import NodeList from './utils/list';
import { DefaultMaximum } from './utils/vendor';

let nodeList: NodeList = new NodeList();

function _message(type: MessageTypes) {
  // 调用 ReactDOM.render 挂载 Message 组件
  return (message: ReactNode, duration?: number | undefined) => {
    // todo 限制最大展示数量
    // const current = nodeList.list.size;
    // const count = current - DefaultMaximum;
    // console.log(count);
    // if (count >= 0) {

    //   return;
    // }

    const node = nodeList.append({ message, duration, type });

    ReactDOM.render(
      <Message id={node.id} type={type} content={message} />,
      node.children,
      nodeList.addRemoveListener.bind(nodeList, node),
    );
  };
}

const success = _message('success');
const error = _message('error');
const warning = _message('warning');
const info = _message('info');

export default {
  success,
  error,
  warning,
  info,
};
