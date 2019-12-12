import {
    REQUEST_STATS,
    REQUEST_EVENTS
} from './constants';

const initialData = {
    stats: [],
    events: []
}

export const requestData = (state = initialData, action={}) => {
    switch (action.type){

        case REQUEST_STATS:
            return { ...state, stats: action.payload };
        case REQUEST_EVENTS:
            return { ...state, events: action.payload };
        default:
            return state;
    }
}