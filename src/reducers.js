import {
    SEARCH_FIELD,
    REQUEST_STATS,
    REQUEST_STATS_DAILY,
    REQUEST_STATS_HOURLY,
    REQUEST_EVENTS,
    REQUEST_EVENTS_DAILY,
    REQUEST_EVENTS_HOURLY,
    REQUEST_POI,
    IS_PENDING,
    REQUEST_TIME_START,
    REQUEST_TIME_END
} from './constants';

const initialSearch = {
    searchField: ''
}

export const searchData = (state=initialSearch, action={}) => {
    switch(action.type) {
        case SEARCH_FIELD:
            return { ...state, searchField: action.payload }
        default:
            return state;
    }
}

const initialData = {
    stats: [],
    stats_hourly: [],
    stats_daily: [],
    events: [],
    events_hourly: [],
    events_daily: [],
    poi: [],
    isPending: true
}

export const requestData = (state = initialData, action={}) => {
    switch (action.type){

        case IS_PENDING:
            return { ...state};
        case REQUEST_STATS:
            return { ...state, stats: action.payload, isPending: false };
        case REQUEST_STATS_DAILY:
            return { ...state, stats_daily: action.payload, isPending: false };
        case REQUEST_STATS_HOURLY:
            return { ...state, stats_hourly: action.payload, isPending: false};
        case REQUEST_EVENTS:
            return { ...state, events: action.payload, isPending: false };
        case REQUEST_EVENTS_DAILY:
            return { ...state, events_daily: action.payload, isPending: false };
        case REQUEST_EVENTS_HOURLY:
            return { ...state, events_hourly: action.payload, isPending: false };
        case REQUEST_POI:
            return { ...state, poi: action.payload, isPending: false };
        default:
            return state;
    }
}

const initialTime = {
    startTime : '',
    endTime : ''
}

export const requestTime = (state=initialTime, action={}) => {
    switch(action.type){

        case REQUEST_TIME_START:
            return { ...state, startTime : action.payload };
        case REQUEST_TIME_END:
            return { ...state, endTime : action.payload };
        default:
            return state;
    }
}