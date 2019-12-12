import {
    REQUEST_STATS,
    REQUEST_EVENTS
} from './constants';

export const requestStats = () => dispatch => {
    fetch("http://localhost:5555/stats")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_STATS, payload: data }) )
};

export const requestEvents = () => dispatch => {
    fetch("http://localhost:5555/events")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_EVENTS, payload: data }) )
};