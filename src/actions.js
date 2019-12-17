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


export const setSearchField = text => ({
    type: SEARCH_FIELD,
    payload: text
});

export const setStartTime = text => ({
    type: REQUEST_TIME_START,
    payload: text
});

export const setEndTime = text => ({
    type: REQUEST_TIME_END,
    payload: text
});

export const requestStats = () => dispatch => {
    dispatch({ type: IS_PENDING });
    fetch("http://localhost:5555/stats")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_STATS, payload: data }) )
};

export const requestStatsHourly = () => dispatch => {
    dispatch({ type: IS_PENDING });
    fetch("http://localhost:5555/stats/hourly")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_STATS_HOURLY, payload: data }) )
}

export const requestStatsDaily = () => dispatch => {
    dispatch({ type: IS_PENDING });
    fetch("http://localhost:5555/stats/daily")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_STATS_DAILY, payload: data }) )
}

export const requestEvents = () => dispatch => {
    dispatch({ type: IS_PENDING });
    fetch("http://localhost:5555/events")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_EVENTS, payload: data }) )
};

export const requestEventsHourly = () => dispatch => {
    dispatch({ type: IS_PENDING });
    fetch("http://localhost:5555/events/hourly")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_EVENTS_HOURLY, payload: data }) )
}

export const requestEventsDaily = () => dispatch => {
    dispatch({ type: IS_PENDING });
    fetch("http://localhost:5555/events/daily")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_EVENTS_DAILY, payload: data }) )
}

export const requestPoi = () => dispatch => {
    dispatch({ type: IS_PENDING });
    fetch("http://localhost:5555/poi")
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_POI, payload: data }))
}