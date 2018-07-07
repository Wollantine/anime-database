import { combineReducers } from 'redux';
import { TAction } from '../../../redux/appReducer';
import { EStatus } from '../../../api/searchAnime';
import { Maybe } from 'tsmonad';
import { UPDATE_QUERY, UPDATE_STATUS, UPDATE_SCORE } from './SearchFormActions';


const searchQuery = (state = '', action: TAction): string => {
    switch (action.type) {
        case UPDATE_QUERY:
            return action.query;
        default:
            return state;
    }
}

const status = (state = Maybe.nothing(), action: TAction): Maybe<EStatus> => {
    switch (action.type) {
        case UPDATE_STATUS:
            return action.status;
        default:
            return state as Maybe<EStatus>;
    }
}

const score = (state = 0, action: TAction): number => {
    switch (action.type) {
        case UPDATE_SCORE:
            return action.score;    
        default:
            return state;
    }
}

export const searchFormReducer = combineReducers({
    searchQuery,
    status,
    score,
});
