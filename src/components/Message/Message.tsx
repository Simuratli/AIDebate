import '../../style/components/message.scss';
import { MessagePropTypes } from './Message.types';

const Message = ({position,children}:MessagePropTypes) => {
  return (
    <div className={`message__container ${position}`}>
        <div className="message">{children}</div>
    </div>
  )
}

export default Message