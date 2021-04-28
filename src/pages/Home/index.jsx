import React, {useEffect} from 'react';
import {Button, Tooltip} from 'antd';
import { withRouter } from 'react-router';
import { EllipsisOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { dialogsActions } from 'redux/actions';
import { Messages, ChatInput, Status, Sidebar } from "../../containers";

import './Home.scss';

// TODO: Сделать typing... что человек пишет в диалоге

const Home = props => {
    const { setCurrentDialogId, user, location } = props;

    useEffect(() => {
        const { pathname } = location;
        const dialogId = pathname.split('/').pop();
        setCurrentDialogId(dialogId);
    }, [props.location.pathname, location, setCurrentDialogId]);

    return (
        <section className="home">

            <div className="chat">
                <Sidebar />
                {user &&
                    (<div className="chat__dialog">
                        <div className="chat__dialog-header">
                            <div></div>
                            <Status online/>
                            <Tooltip placement="bottom" title="Налаштування">
                                <Button shape="circle" type="link">
                                    <EllipsisOutlined style={{fontSize: '24px', color: '#AAAAAA'}}/>
                                </Button>
                            </Tooltip>
                        </div>
                        <Messages />
                        <div className="chat__dialog-input" id="dialogInput">
                            <ChatInput />
                        </div>
                    </div>)
                }
            </div>

            {/*<Message*/}
            {/*    avatar="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2045&q=80"*/}
            {/*    date={new Date('Sun Oct 25 2020 15:10:41')}*/}
            {/*    isMe={false}*/}
            {/*    isReaded={true}*/}
            {/*    audio="https://cdn-static.namobilu.com/u/ring/f/530/098/ramil_siyaj.mp3"*/}
            {/*/>*/}

            {/*<Message*/}
            {/*    avatar="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2045&q=80"*/}
            {/*    text="Салам, Брут! Че, як, знищив флот галлів? 🖐🏻"*/}
            {/*    date={new Date('Sun Oct 25 2020 15:10:41')}*/}
            {/*    isMe={false}*/}
            {/*    isReaded={true}*/}
            {/*    attachments={[*/}
            {/*        {*/}
            {/*            filename: 'image.jpg',*/}
            {/*            url: 'https://source.unsplash.com/100x100/?random=1&nature,water'*/}
            {/*        },*/}
            {/*        {*/}
            {/*            filename: 'image.jpg',*/}
            {/*            url: 'https://source.unsplash.com/100x100/?random=2&nature,water'*/}
            {/*        },*/}
            {/*        {*/}
            {/*            filename: 'image.jpg',*/}
            {/*            url: 'https://source.unsplash.com/100x100/?random=3&nature,water'*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*/>*/}
            {/*<Message*/}
            {/*    avatar="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2045&q=80"*/}
            {/*    text="Салам, Брут! Че, як, знищив флот галлів? 🖐🏻"*/}
            {/*    date={new Date('Sun Oct 25 2020 15:10:41')}*/}
            {/*    isMe={true}*/}
            {/*    isReaded={true}*/}
            {/*/>*/}
            {/*<Message*/}
            {/*    avatar="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2045&q=80"*/}
            {/*    attachments={[*/}
            {/*        {*/}
            {/*            filename: 'image.jpg',*/}
            {/*            url: 'https://source.unsplash.com/100x100/?random=1&nature,water'*/}
            {/*        }*/}
            {/*    ]}*/}
            {/*/>*/}
            {/*<Message*/}
            {/*    avatar="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2045&q=80"*/}
            {/*    isTyping*/}
            {/*/>*/}
        </section>
    )
};

export default withRouter(
    connect(
        ({ user }) => ({ user: user.data }),
        dialogsActions,
    )(Home),
);
