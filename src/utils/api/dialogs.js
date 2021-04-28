import { axios } from "../../core";

const apiDialogs = {
    getAll: () => axios.get('/dialogs'),
    create: ({partner, text}) => axios.post('/dialogs', {partner, text})
};

export default apiDialogs;
