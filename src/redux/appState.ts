import { ISearchFormState } from "../components/SearchForm/redux/SearchFormState";

export interface IState {
    searchForm: ISearchFormState;
}

export type TSelector<T> = (state: IState) => T;
