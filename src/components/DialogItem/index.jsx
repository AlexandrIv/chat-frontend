import React from 'react';
import classNames from 'classnames';
import { IconRead, Avatar } from '../';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import parseISO from 'date-fns/parseISO';
import { Link } from 'react-router-dom';

import './DialogItem.scss';

const getMessageTime = createdAt => {
    if(isToday(parseISO(createdAt))) {
        return format(new Date(createdAt), 'HH:mm');
    } else {
        return format(new Date(createdAt), 'dd.MM.yyyy');
    }
}

const DialogItem = (props) => {
    const { _id, isMy, currentDialogId, lastMessage } = props;

    return (
        <Link to={`/dialog/${_id}`}>
            <div className={
                classNames('dialogs__item',
                    {
                        "dialogs__item--online": lastMessage.user.isOnline,
                        "dialogs__item--selected": currentDialogId === _id
                    }
                )}>
                <div className="dialogs__item-avatar">
                    <Avatar user={lastMessage.user}/>
                </div>
                <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                        <b>{lastMessage.user.fullname}</b>
                        <span>{getMessageTime(lastMessage.createdAt)}</span>
                    </div>
                    <div className="dialogs__item-info-bottom">
                        <p>{lastMessage.text}</p>
                        {isMy && <IconRead isMe={isMy} isRead={lastMessage.read}/>}
                        {lastMessage.unread > 0 && (<div
                            className="dialogs__item-info-bottom-count">{lastMessage.unread > 9 ? '+9' : lastMessage.unread}</div>)}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DialogItem;
