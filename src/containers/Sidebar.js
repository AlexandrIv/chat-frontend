import React, { useState } from "react";
import { connect } from "react-redux";
import { userApi, dialogsApi } from "../utils/api";

import { Sidebar } from '../components';

const SidebarContainer = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messageText, setMessageText] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');

    const onClose = () => {
        setVisible(false);
        setSelectedUserId('');
    };

    const onShow = () => {
        setVisible(true);
    };

    const onSearch = (value) => {
        userApi.findUsers(value).then(({ data }) => {
            setUsers(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    };

    const onAddDialog = () => {
        dialogsApi
            .create({
                partner: selectedUserId,
                text: messageText
            })
            .then(onClose)
            .catch(() => {
            setIsLoading(false);
        });
    }

    const handleChangeInput = value => {
        setInputValue(value);
    }

    const onChangeTextArea = e => {
        setMessageText(e.target.value);
    }

    const onSelectUser = (userId) => {
        setSelectedUserId(userId);
    }

    return <Sidebar
        user={user}
        inputValue={inputValue}
        visible={visible}
        onShow={onShow}
        onClose={onClose}
        onSearch={onSearch}
        onChangeInput={handleChangeInput}
        users={users}
        onSelectUser={onSelectUser}
        onModalOk={onAddDialog}
        isLoading={isLoading}
        messageText={messageText}
        onChangeTextArea={onChangeTextArea}
        selectedUserId={selectedUserId}
    />;
};

export default connect(({ user }) => ({user: user.data}))(SidebarContainer);
