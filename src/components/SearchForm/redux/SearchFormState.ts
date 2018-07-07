import { EStatus } from '../../../api/searchAnime';
import { Maybe } from 'tsmonad';

export interface ISearchFormState {
    searchQuery: string;
    status: Maybe<EStatus>;
    score: number;
}
