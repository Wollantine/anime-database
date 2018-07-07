import { ISearchFormState } from "../components/SearchForm/redux/SearchFormState";
import { IAnimeTableState } from "../components/AnimeTable/redux/AnimeTableState";

export interface IState {
    searchForm: ISearchFormState;
    animeTable: IAnimeTableState;
}

export type TSelector<T> = (state: IState) => T;
