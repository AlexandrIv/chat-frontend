import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";

import { userApi } from "../../../utils/api";
import { Block } from "../../../components";

const renderTextInfo = (hash, verified) => {
    if(hash) {
        if(!verified) {
            return {
                status: 'error',
                title: 'Помилка!',
                message: 'Помилка при підтвердженні аккаунта'
            }
        } else {
            return {
                status: 'success',
                title: 'Вітаю.',
                message: 'Аккаунт успішно підтверджений'
            };
        }
    } else {
        return {
            status: 'success',
            title: 'Підтвердіть свій аккаунт.',
            message: 'На Вашу пошту відправлено лист з посиланням на підтвердження аккаунта.'
        }
    }
};

const CheckEmailInfo = ({ location, history }) => {
    const [ verified, setVerified ] = useState(false);
    const hash = location.search.split('hash=')[1];
    const info = renderTextInfo(hash, verified);

    useEffect(() => {
        if(hash) {
            userApi.verifyHash(hash).then(({data}) => {
                if(data.status === 'success') {
                    setVerified(true);
                }
            });
        }
    });

    return (
        <Block>
            <Result
                status={info.status}
                title={info.title}
                subTitle={info.message}
                extra={ info.status === 'success' && verified && <Button onClick={() => history.push('/signin')}>Увійти</Button> }
            />
        </Block>
    );
}

export default CheckEmailInfo;
