import uuid4 from 'uuid4';

const initState = [];
export default (prevState = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        default:
            return prevState;
        case 'ADD_LOG_EVENT': {
            return [
                ...prevState,
                {
                    message: payload,
                    id: uuid4()
                }
            ];
        }
        case 'REMOVE_LOG_EVENT': {
            const nextState = prevState.filter(event => event.id !== payload);
            return [...nextState];
        }
        case 'TRUNCATE_LOG': {
            const nextState = prevState.slice(-2);
            return [...nextState];
        }
    }
};
