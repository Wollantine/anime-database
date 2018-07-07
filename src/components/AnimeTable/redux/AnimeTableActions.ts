import { IAnime } from "../../../api/searchAnime";

export const ANIME_FETCH_SUCCESS = 'ANIME_FETCH_SUCCESS';

export const animeFetchSuccess = (animeList: IAnime[]) => ({
    type: ANIME_FETCH_SUCCESS,
    animeList,
});
