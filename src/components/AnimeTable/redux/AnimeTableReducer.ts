import { combineReducers } from "redux";
import { TAction } from "../../../redux/appReducer";
import { IRow } from "./AnimeTableState";
import { IAnime } from "../../../api/searchAnime";
import { ANIME_FETCH_SUCCESS } from "./AnimeTableActions";

const animeToRow = (anime: IAnime): IRow => ({
    id: anime.malId,
    title: anime.title,
    score: anime.score,
    episodes: anime.episodes,
    description: anime.description,
});

const rows = (state: IRow[] = [], action: TAction) => {
    switch (action.type) {
        case ANIME_FETCH_SUCCESS:
            return action.animeList.map(animeToRow);
        default:
            return state;
    }
}

export const animeTableReducer = combineReducers({
    rows,
});
