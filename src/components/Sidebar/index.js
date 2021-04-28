import React from "react";
import { FormOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Tooltip, Modal, Select, Input, Form } from "antd";

import { Dialogs } from "../../containers";
import "./Sidebar.scss";

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({
                     user,
                     visible,
                     users,
                     onShow,
                     onClose,
                     onSearch,
                     onChangeInput,
                     inputValue,
                     onSelectUser,
                     isLoading,
                     onModalOk,
                     onChangeTextArea,
                     messageText,
                     selectedUserId
                 }) => {
    const options = users.map((user) => <Option key={user._id} value={user._id}>{user.fullname}</Option>);

    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div>
                    <TeamOutlined />
                    <span>Список диалогов</span>
                </div>
                <Tooltip placement="top" title="Написати">
                    <Button shape="circle" type="link" onClick={onShow}>
                        <FormOutlined />
                    </Button>
                </Tooltip>
            </div>

            <div className="chat__sidebar-dialogs">
                <Dialogs userId={user && user._id} />
            </div>
            <Modal
                title="Створити діалог"
                visible={visible}
                onCancel={onClose}
                footer={[
                    <Button key="back" onClick={onClose}>Закрити</Button>,
                    <Button key="submit" type="primary" loading={isLoading} onClick={onModalOk} disabled={!messageText}>Створити</Button>
                ]}>
                <Form layout="vertical">
                    <Form.Item name="users" label="Введіть ім'я або пошту користувача" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Введіть ім'я або пошту користувача"
                            optionFilterProp="children"
                            onSelect={onSelectUser}
                            onSearch={onSearch}
                            onChange={onChangeInput}
                            onClick={onSearch}
                            value={inputValue}>
                            {options}
                        </Select>
                    </Form.Item>
                    {selectedUserId &&
                        (<Form.Item
                            name="text"
                            label="Введіть текст повідомлення"
                            rules={[{ required: true, message: "Введіть текст повідомлення" }]}>
                            <TextArea
                                placeholder="Введіть текст повідомлення"
                                autosize={{ minRows: 3, maxRows: 10 }}
                                onChange={onChangeTextArea}
                                value={messageText}
                            />
                        </Form.Item>)
                    }
                </Form>
            </Modal>
        </div>
    );
}

Sidebar.defaultProps = {
    users: []
};

export default Sidebar;
