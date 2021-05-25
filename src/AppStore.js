import { createStore } from "redux";

const initialState = {
    "releasedMovies": [],
    "movieDetailsID": ""
}
function releasedMoviesReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_RELEASED_MOVIES":
            return { ...state, "releasedMovies": action.payload };
        case "SET_MOVIE_ID":
            return { ...state, "movieDetailsID": action.payload };
        case "UNSET_MOVIE_ID":
            return { ...state, "movieDetailsID": "" };
        default:
            return state;
    }
}

export default createStore(releasedMoviesReducer);

