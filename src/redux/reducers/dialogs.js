const initialState = {
    items: [],
    currentDialogId: window.location.pathname.split('dialog/')[1],
    isLoading: false,
};

const Dialogs = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            return {
                ...state,
                items: payload
            };
        case 'DIALOGS:SET_CURRENT_DIALOG_ID':
            return {
                ...state,
                currentDialogId: payload
            };
        default:
            return state;
    }
};

export default Dialogs;
