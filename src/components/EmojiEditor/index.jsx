import React from "react";
import { Button, Tooltip } from "antd";
import SmileOutlined from "@ant-design/icons/SmileOutlined";
import { NimblePicker } from "emoji-mart";
import data from "emoji-mart/data/apple.json";

import "pell/dist/pell.css";
import "./EmojiEditor.scss";
import {UploadField} from "@navjobs/upload";
import CameraOutlined from "@ant-design/icons/CameraOutlined";
import SendOutlined from "@ant-design/icons/SendOutlined";
import AudioOutlined from "@ant-design/icons/AudioOutlined";

const EmojiEditor = ({id, getPos, handleEmojiClick, toggleEmojiPicker, showEmojis, editor, htmlProp, onSelectFiles}) => {
    return (
        <div className="emoji-editor">
            <div className="emoji-editor__smile-btn">
                <div className="emoji-editor__emoji-picker">
                    {showEmojis && (
                        <NimblePicker
                            set='apple'
                            color="#3B76FC"
                            onSelect={handleEmojiClick}
                            data={data}
                        />
                    )}
                </div>
                <Tooltip placement="top" title="Смайл">
                    <Button shape="circle" type="link" onClick={toggleEmojiPicker}>
                        <SmileOutlined />
                    </Button>
                </Tooltip>
            </div>

            <div
                ref={editor}
                id={id}
                className="pell"
                onKeyUp={getPos}
                onClick={getPos}
            />

            <div className="emoji-editor__actions">
                <Tooltip placement="top" title="Фото">
                    <Button shape="circle" type="link">
                        <UploadField
                            onFiles={onSelectFiles}
                            containerProps={{
                                className: 'upload-btn'
                            }}
                            uploadProps={{
                                accept: '.jpg,.jpeg,.png,.svg,.git,.bmp',
                                multiple: 'multiple'
                            }}>
                            <CameraOutlined />
                        </UploadField>
                    </Button>
                </Tooltip>
                {htmlProp
                    ?
                    <Tooltip placement="top" title="Надіслати">
                        <Button shape="circle" type="link">
                            <SendOutlined />
                        </Button>
                    </Tooltip>
                    :
                    <Tooltip placement="top" title="Запишіть повідомлення">
                        <Button shape="circle" type="link">
                            <AudioOutlined />
                        </Button>
                    </Tooltip>
                }
            </div>
        </div>
    );
};

export default EmojiEditor;
