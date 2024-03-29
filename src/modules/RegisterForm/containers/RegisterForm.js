import { withFormik } from "formik";
import RegisterForm from "../components/RegisterForm";
import validateForm from "../../../utils/helpers/validate";
import store from "../../../redux/store";
import {userActions} from "../../../redux/actions";

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        fullname: "",
        password: "",
        password_2: ""
    }),
    validate: values => {
        const errors = {};

        validateForm({ isAuth: false, values, errors });

        return errors;
    },
    handleSubmit: (values, { setSubmitting, props }) => {
        store
            .dispatch(userActions.fetchUserRegister(values))
            .then(({ status }) => {
                if(status === 'success') {
                    setTimeout(() => {
                        props.history.push('/');
                    }, 50);
                }
                setSubmitting(false);
            }).catch(() => {
            setSubmitting(false);
        });
    },
    displayName: 'RegisterForm',
})(RegisterForm);
