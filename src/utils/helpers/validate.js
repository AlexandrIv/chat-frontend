const Validate = ({isAuth, values, errors}) => {
    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введіть E-Mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = 'Невірний E-Mail';
            }
        },
        fullname: (value) => {
            if (!isAuth && !value) {
                errors.fullname = "Введіть ім'я";
            } else if(/[^a-zA-Z^а-яА-ЯіІєїґ ]/u.test(value)) {
                errors.fullname = "Ім'я має містити лише букви";
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Введіть пароль';
            } else if( !isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/i.test(value)) {
                errors.password = isAuth ? 'Невірний пароль' : 'Занадто легкий пароль';
            }
        },
        password_2: (value) => {
            if (!isAuth && !value) {
                errors.password_2 = 'Повторіть пароль';
            } else if(values.password !== value) {
                errors.password_2 = isAuth ? 'Невірний пароль' : 'Паролі не співпадають';
            }
        }
    }
    Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};

export default Validate;

