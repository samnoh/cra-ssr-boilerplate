import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// requestType -> GET_POST, GET_UESRS, ...
export const startLoading = createAction(START_LOADING, requestType => requestType);
export const finishLoading = createAction(FINISH_LOADING, requestType => requestType);

const initialState = {};

const loading = handleActions(
    {
        [START_LOADING]: (state, action) => {
            console.log('Start', action.payload);
            return {
                ...state,
                [action.payload]: true
            };
        },
        [FINISH_LOADING]: (state, action) => {
            console.log('Finish', action.payload);
            return {
                ...state,
                [action.payload]: false
            };
        }
    },
    initialState
);

export default loading;
