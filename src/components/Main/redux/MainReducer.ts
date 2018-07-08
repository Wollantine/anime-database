import { combineReducers } from "redux";
import { ANIME_FETCH_FAILURE, ANIME_FETCH_SUCCESS, ANIME_FETCH_START } from "../../AnimeTable/redux/AnimeTableActions";
import { TAction } from "../../../redux/appReducer";

const isLoading = (state = false, action: TAction): boolean => {
    switch (action.type) {
        case ANIME_FETCH_START:
            return true;
        case ANIME_FETCH_FAILURE:
        case ANIME_FETCH_SUCCESS:
            return false;
        default:
            return state;
    }
};

export const mainReducer = combineReducers({
    isLoading,
});
