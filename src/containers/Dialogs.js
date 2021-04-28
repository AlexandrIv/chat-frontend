import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { dialogsActions } from "../redux/actions";
import socket from '../core/socket';

import { Dialogs as BaseDialogs } from "../components"

const Dialogs = ({ fetchDialogs, currentDialogId, setCurrentDialogId, items, userId }) => {
    const [searchValue, setValue] = useState('');
    const [filtered, setFilteredItems] = useState(Array.from(items));

    const onChangeInput = useCallback((value = '') => {
        setFilteredItems(
            items.filter(dialog =>
                dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            ),
        );
        setValue(value);
    }, [setFilteredItems, items]);

    useEffect(() => {
        if(items.length) {
            onChangeInput();
        }
    }, [items, onChangeInput]);

    useEffect(() => {
        fetchDialogs();
        socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
        socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
        return () => {
            socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
            socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs);
        }
    }, [fetchDialogs]);

    return (
        <BaseDialogs
            items={filtered}
            userId={userId}
            onSearch={onChangeInput}
            inputValue={searchValue}
            currentDialogId={currentDialogId}
        />
    );
};

export default connect(({dialogs}) => dialogs, dialogsActions)(Dialogs);
