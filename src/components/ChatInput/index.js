import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { UploadFiles, InputEmoji } from "../";
import { EmojiEditor } from "../../containers";
import './ChatInput.scss';

const ChatInput = props => {
    const {
        attachments,
        onSelectFiles,
        handleSendMessage,
        setValue,
        value
    } = props;

    const onSendEnter = () => {
        handleSendMessage(value);
    }

    return (
        <>
            <div className="chat-input">
                <div className="chat-input__text-area">

                    {/*<InputEmoji*/}
                    {/*    value={value}*/}
                    {/*    onChange={setValue}*/}
                    {/*    cleanOnEnter*/}
                    {/*    onEnter={handleSendMessage}*/}
                    {/*    onSelectFiles={onSelectFiles}*/}
                    {/*    placeholder="Type a message"*/}
                    {/*/>*/}

                    <EmojiEditor htmlProp={value} onChange={setValue} onSelectFiles={onSelectFiles} onSendEnter={onSendEnter} />

                </div>
                <div className="chat-input__attachments">
                    <UploadFiles attachments={attachments} />
                </div>
            </div>
        </>
    )
};

ChatInput.propTypes = {
    className: PropTypes.string
};

export default ChatInput;
