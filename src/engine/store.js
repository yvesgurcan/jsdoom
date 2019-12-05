import { createStore } from 'redux';
import reducers from './reducers';

export const store = createStore(
    reducers /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const dispatch = store.dispatch;

export const getState = (property = null) => {
    const state = store.getState();
    if (!property) {
        return state;
    }
    const result = state[property];
    return result;
};
