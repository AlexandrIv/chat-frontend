import React from 'react';
import { Empty, Spin } from "antd";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Message } from "../";
import "./Messages.scss";

const Messages = ({ blockRef, isLoading, items, user, onRemoveMessage, blockHeight }) => {

    return (
        <div className="chat__dialog-messages" style={{ height: `calc(100% - ${blockHeight}px)` }}>
            <div ref={blockRef} className={classNames('messages', {
                'messages--loading': isLoading
            })}>
                { isLoading
                    ? (<Spin tip="Завантаження..." />)
                    : items && !isLoading ? (
                        <div>
                            {
                                items.length > 0
                                    ? items.map((item, index) => {
                                        return (<Message key={item._id} {...item} isMe={user._id === item.user._id} onRemoveMessage={onRemoveMessage.bind(this, item._id)} />);
                                    })
                                    : (<Empty description="Немає повідомлень" />)
                            }
                        </div>
                    ) : (
                        <Empty description="Відкрийте діалог" />
                    )
                }
            </div>
        </div>
    );
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
