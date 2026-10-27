import { Component, ReactNode } from 'react';
import MessageIcon from '../Icon';
import styles from './index.less';

type IProps = {
  id: string;
  type: MessageTypes;
  content: ReactNode;
};

class Message extends Component<IProps> {
  render() {
    const { id, type, content } = this.props;
    return (
      <span
        className={[styles.msg_card, styles.msg_leaving].join(' ')}
        key={id}
      >
        <MessageIcon type={type} />
        {content}
      </span>
    );
  }
}

export default Message;
