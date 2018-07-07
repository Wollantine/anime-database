import {combineReducers} from 'redux';
import { searchFormReducer } from '../components/SearchForm/redux/SearchFormReducer';

export type TAction = {
    [key: string]: any;
    type: string;
};

export type TReducer<T> = (state: T | undefined, action: TAction) => T;

export const appReducer = combineReducers({
    searchForm: searchFormReducer,
});
