import { takeLatest, select, call, put, cancelled } from 'redux-saga/effects';
import { UPDATE_QUERY, UPDATE_SCORE, UPDATE_STATUS } from "./SearchFormActions";
import { IState } from '../../../redux/appState';
import { searchAnime, IAnime } from '../../../api/searchAnime';
import { Api } from '../../../api/api';
import { ISearchFormState } from './SearchFormState';
import { Future } from 'fluture';
import { animeFetchSuccess, animeFetchFailure, animeFetchStart } from '../../AnimeTable/redux/AnimeTableActions';
import { delay } from 'redux-saga';
import { TAction } from '../../../redux/appReducer';

const isValidUpdateQueryAction = (action: TAction): boolean => (
    action.type === UPDATE_QUERY && (action.query.length >= 3 || action.query.length === 0)
);

export function* watchFieldUpdates() {
    yield takeLatest([
        isValidUpdateQueryAction,
        UPDATE_SCORE,
        UPDATE_STATUS,
    ], fetchAnimeList);
}

function* fetchAnimeList() {
    yield call(delay, 1000);
    const futureAnimeList: Future<string, IAnime[]> = yield call(animeListRequest);
    yield call(resolveAnimeList, futureAnimeList);
}

function* animeListRequest() {
    const {searchQuery, score, status}: ISearchFormState = yield select((state: IState) => state.searchForm);
    const statusOption = status.caseOf({
        just: (realStatus) => ({status: realStatus}),
        nothing: () => ({}),
    });
    const advancedSearchOptions = {
        score,
        ...statusOption,
    };
    return yield call(searchAnime, Api, searchQuery, undefined, advancedSearchOptions);
}

function* resolveAnimeList(futureAnimeList) {
    try {
        yield put(animeFetchStart());
        const animeList = yield call(() => futureAnimeList.promise());
        yield put(animeFetchSuccess(animeList));
    } catch (error) {
        yield put(animeFetchFailure(error));
    }
}
