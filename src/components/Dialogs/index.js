import React from 'react';
import { Input, Empty } from "antd";
import { DialogItem } from "../index";
import orderBy from 'lodash/orderBy';

import './Dialogs.scss';

//const { Search } = Input;

const Dialogs = ({ items, userId, onSearch, inputValue, currentDialogId }) => {
    return (
        <div className="sidebar-dialogs">
            <div className="search">
                <Input
                    placeholder="Поиск среди контактов"
                    onChange={e => onSearch(e.target.value)}
                    value={inputValue}
                />
            </div>
            <div className="dialogs">
                {items.length ? (
                    orderBy(items, ["created_at"], ["desc"]).map(item => {
                        return (
                            <DialogItem
                                key={item._id}
                                isMy={item.author._id === userId}
                                currentDialogId={currentDialogId}
                                {...item}
                            />
                        )
                    })
                    ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нічого не знайдено"/>
                    )}
            </div>
        </div>
    )
}

export default Dialogs;
