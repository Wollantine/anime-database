import { IAnime } from "../../../api/searchAnime";

export const ANIME_FETCH_SUCCESS = 'ANIME_FETCH_SUCCESS';
export const ANIME_FETCH_FAILURE = 'ANIME_FETCH_FAILURE';

export const animeFetchSuccess = (animeList: IAnime[]) => ({
    type: ANIME_FETCH_SUCCESS,
    animeList,
});

export const animeFetchFailure = (error: string) => ({
    type: ANIME_FETCH_FAILURE,
    error,
});
