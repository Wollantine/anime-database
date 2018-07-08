import { combineReducers } from "redux";
import { TAction } from "../../../redux/appReducer";
import { IRow } from "./AnimeTableState";
import { IAnime } from "../../../api/searchAnime";
import { ANIME_FETCH_SUCCESS, UPDATE_TABLE_SORTING } from "./AnimeTableActions";
import * as R from 'ramda';

const animeToRow = (anime: IAnime): IRow => ({
    id: anime.malId,
    title: anime.title,
    score: anime.score,
    episodes: R.defaultTo(-1, anime.episodes),
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

const order = (state: 'asc' | 'desc' = 'desc', action: TAction) => {
    switch (action.type) {
        case UPDATE_TABLE_SORTING:
            return !action.isSameColumn
                ? 'desc'
                : state === 'asc' ? 'desc' : 'asc';
        default:
            return state;
    }
}

const orderBy = (state: keyof IRow = 'id', action: TAction) => {
    switch (action.type) {
        case UPDATE_TABLE_SORTING:
            return action.columnId;
        default:
            return state;
    }
}

export const animeTableReducer = combineReducers({
    rows,
    order,
    orderBy,
});
