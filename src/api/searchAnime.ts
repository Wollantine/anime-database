import * as qs from 'querystrings';
import * as renderTemplate from 'string-template';
import { get } from './api';
import { processedResponse } from './responseProcessor';
import * as R from 'ramda';
import { Future } from 'fluture';

const SEARCH_ANIME_ENDPOINT = '/search/anime/{page}';

export enum EInfoType {
    anime = 'anime',
    manga = 'manga',
    person = 'person',
    character = 'character',
}

export enum EStatus {
    airing = 'airing',
    complete = 'complete',
    upcoming = 'upcoming',
}

export interface IAdvancedSearchOptions {
    q: string;
    status: EStatus;
    score: number;
}

export interface IAnime {
    malId: number;
    url: string;
    imageUrl: string;
    title: string;
    description: string;
    type: string;
    score: number;
    episodes: number;
    members: number;
}

const animeAlike: IAnime = {
    malId: 0,
    url: '',
    imageUrl: '',
    title: '',
    description: '',
    type: '',
    score: 0,
    episodes: 0,
    members: 0,
};

export const searchInfoUrl = (
    type: EInfoType,
    page?: number,
    advancedSearchOptions?: Partial<IAdvancedSearchOptions>
) => {
    const endpoint = renderTemplate(SEARCH_ANIME_ENDPOINT, {type, page});
    const queryString = qs.stringify(advancedSearchOptions);
    return endpoint + '?' + queryString;
}

const encodeUtf8 = (s: string) => unescape(encodeURIComponent(s));

const isAnime = (entity: any): entity is IAnime =>
    R.allPass(Object.keys(animeAlike).map(R.has))(entity);

export const searchAnime = (
    query: string,
    page?: number,
    advancedSearchOptions?: Partial<IAdvancedSearchOptions>
): Future<string, IAnime> => {
    const searchOptions = {...advancedSearchOptions, q: encodeUtf8(query)};
    const url = searchInfoUrl(EInfoType.anime, page, searchOptions);
    return processedResponse<IAnime>(get(url), isAnime);
}