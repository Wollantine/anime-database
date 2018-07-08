import {all, fork} from 'redux-saga/effects';
import { watchFieldUpdates } from '../components/SearchForm/redux/SearchFormSaga';

export type TEffects = IterableIterator<any>;

export function* appSaga(): TEffects {
    yield all([
        watchFieldUpdates,
    ].map(fork));
}
