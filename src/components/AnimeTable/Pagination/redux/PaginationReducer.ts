import { combineReducers } from "redux";
import { TAction } from "../../../../redux/appReducer";
import { CHANGE_PAGE } from "./PaginationActions";
import * as R from 'ramda';
import { ANIME_FETCH_SUCCESS, ANIME_FETCH_FAILURE } from "../../redux/AnimeTableActions";

const page = (state = 0, action: TAction): number => {
    switch (action.type) {
        case ANIME_FETCH_SUCCESS:
        case ANIME_FETCH_FAILURE:
            return 0;
        case CHANGE_PAGE:
            return action.page;
        default:
            return state;
    }
}

export const paginationReducer = combineReducers({
    page,
    pageSize: R.always(10),
});
