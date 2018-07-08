import { ISearchFormState } from "../components/SearchForm/redux/SearchFormState";
import { IAnimeTableState } from "../components/AnimeTable/redux/AnimeTableState";
import { IMainState } from "../components/Main/redux/MainState";

export interface IState {
    searchForm: ISearchFormState;
    animeTable: IAnimeTableState;
    main: IMainState;
}

export type TSelector<T> = (state: IState) => T;
