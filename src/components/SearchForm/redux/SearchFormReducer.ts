import { combineReducers } from 'redux';
import { TAction } from '../../../redux/appReducer';
import { EStatus } from '../../../api/searchAnime';
import { Maybe } from 'tsmonad';


const searchQuery = (state = '', action: TAction): string => {
    switch (action.type) {
        default:
            return state;
    }
}

const status = (state = Maybe.nothing(), action: TAction): Maybe<EStatus> => {
    switch (action.type) {
        default:
            return state as Maybe<EStatus>;
    }
}

const score = (state = 0, action: TAction): number => {
    switch (action.type) {
        default:
            return state;
    }
}

export const searchFormReducer = combineReducers({
    searchQuery,
    status,
    score,
});
