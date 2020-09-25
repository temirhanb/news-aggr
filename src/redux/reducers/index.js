import {combineReducers} from "redux";
import posts from "./posts";
import sites from "./sites";

const rootReducers = combineReducers({
    posts,
    sites
})

export default rootReducers