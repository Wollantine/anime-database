import { EStatus } from "../../../api/searchAnime";
import {Maybe} from 'tsmonad';

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const updateQuery = (query: string) => ({
    type: UPDATE_QUERY,
    query,
});

export const updateStatus = (status: Maybe<EStatus>) => ({
    type: UPDATE_STATUS,
    status,
});

export const updateScore = (score: number) => ({
    type: UPDATE_SCORE,
    score,
});
