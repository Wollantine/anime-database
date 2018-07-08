import { IAnime } from "../../../api/searchAnime";
import { IRow } from "./AnimeTableState";

export const ANIME_FETCH_START = 'ANIME_FETCH_START';
export const ANIME_FETCH_SUCCESS = 'ANIME_FETCH_SUCCESS';
export const ANIME_FETCH_FAILURE = 'ANIME_FETCH_FAILURE';
export const UPDATE_TABLE_SORTING = 'UPDATE_TABLE_SORTING';

export const animeFetchStart = () => ({type: ANIME_FETCH_START});

export const animeFetchSuccess = (animeList: IAnime[]) => ({
    type: ANIME_FETCH_SUCCESS,
    animeList,
});

export const animeFetchFailure = (error: string) => ({
    type: ANIME_FETCH_FAILURE,
    error,
});

export const updateTableSorting = (columnId: keyof IRow, isSameColumn: boolean) => ({
    type: UPDATE_TABLE_SORTING,
    columnId,
    isSameColumn,
});
