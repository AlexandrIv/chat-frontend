import React from 'react';
import {Form, Input} from "antd";
import {Block, Button as BaseButton} from "../../../components";
import { validateField } from "../../../utils/helpers";
import { Link } from 'react-router-dom';
import {LockOutlined, MailOutlined} from "@ant-design/icons";

const LoginForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props;
    return (
        <div>
            <div className="auth__top">
                <h2>Ввійти в аккаунт</h2>
                <p>Будь ласка, увійдіть в свій аккаунт</p>
            </div>
            <Block>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item
                        validateStatus={ validateField('email', touched, errors)}
                        help={!touched.email ? '' : errors.email}
                        hasFeedback>
                        <Input
                            id="email"
                            prefix={<MailOutlined />}
                            size="large"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={ validateField('password', touched, errors) }
                        help={!touched.password ? '' : errors.password}
                        hasFeedback>
                        <Input.Password
                            id="password"
                            prefix={<LockOutlined />}
                            size="large"
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <BaseButton disabled={isSubmitting} onClick={handleSubmit} type="primary" htmlType="submit" size="large">Ввійти</BaseButton>
                    </Form.Item>
                    <Form.Item>
                        <Link className="auth__register-link" to="/signup">Зареєструватися</Link>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    )
}

export default LoginForm;
