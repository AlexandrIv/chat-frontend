import React from 'react';
import { Form } from "antd";
import { InfoCircleOutlined, MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

import {Block, Button as BaseButton, FormField} from "../../../components";
import { Link } from 'react-router-dom';

const success = true;

const RegisterForm = props => {
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
                <h2>Реєстрація</h2>
                <p>Для входу в чат, вам потрібно зареєструватися</p>
            </div>
            <Block>
                { success ? (
                        <Form onSubmit={handleSubmit} className="login-form">
                            <FormField
                                name="email"
                                icon={<MailOutlined />}
                                placeholder="Email"
                                type="email"
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                            />
                            <FormField
                                name="fullname"
                                icon={<UserOutlined />}
                                placeholder="Ваше ім'я та фамілія"
                                type="text"
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                            />
                            <FormField
                                name="password"
                                icon={<LockOutlined />}
                                placeholder="Пароль"
                                type="password"
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                            />
                            <FormField
                                name="password_2"
                                icon={<LockOutlined />}
                                placeholder="Повторіть пароль"
                                type="password"
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                            />
                            <Form.Item>
                                <BaseButton disabled={isSubmitting} onClick={handleSubmit} type="primary" htmlType="submit" size="large">Зареєструватися</BaseButton>
                            </Form.Item>
                            <Form.Item>
                                <Link className="auth__register-link" to="/signin">Ввійти</Link>
                            </Form.Item>
                        </Form>
                    ) :
                    <div className="auth__success-block">
                        <InfoCircleOutlined />
                        <h2>Підтвердіть свій аккаунт</h2>
                        <p>На Вашу пошту відправлено лист з посиланням на підтвердження аккаунта.</p>
                    </div>
                }
            </Block>
        </div>
    )
}

export default RegisterForm;
