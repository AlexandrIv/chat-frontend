import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Empty } from "antd";
import find from 'lodash/find';

import { messagesActions } from "../redux/actions";
import { Messages as BaseMessages } from "../components";
import socket from "../core/socket";

const Dialogs = ({currentDialog, fetchMessages, addMessage, items, user, isLoading, removeMessageById, attachments}) => {
    const [blockHeight, setBlockHeight] = useState(169);
    const messagesRef = useRef(null);

    const onNewMessage = data => {
        addMessage(data);
    };

    useEffect(() => {
        if (attachments.length) {
            setBlockHeight(267);
        } else {
            setBlockHeight(169);
        }
    }, [attachments]);

    useEffect(() => {
        if(currentDialog) {
            fetchMessages(currentDialog._id);
        }

        socket.on('SERVER:NEW_MESSAGE', onNewMessage);

        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
        };
    }, [currentDialog]);

    useEffect(() => {
        if(messagesRef.current) {
            messagesRef.current.scrollTo(0, 9999999);
        }
    }, [items]);

    return currentDialog
        ? <BaseMessages user={user} blockRef={messagesRef} items={items} isLoading={isLoading} onRemoveMessage={removeMessageById} blockHeight={blockHeight} />
        : <Empty description="Відкрийте діалог" />
};

export default connect(
    ({dialogs, messages, user, attachments}) => ({
        currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
        items: messages.items,
        isLoading: messages.isLoading,
        attachments: attachments.items,
        user: user.data
    }),
    messagesActions
)(Dialogs);
