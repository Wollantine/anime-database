import * as qs from 'querystrings';
import renderTemplate from 'string-template';
import { IApi } from './api';
import { processedResponse, TMap } from './responseProcessor';
import * as R from 'ramda';
import { Future } from 'fluture';

const SEARCH_INFO_ENDPOINT = '/search/{type}/{query}/{page}';

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
    episodes?: number;
    members?: number;
}

const animeAlike: IAnime = {
    malId: 0,
    url: '',
    imageUrl: '',
    title: '',
    description: '',
    type: '',
    score: 0,
};

export const searchInfoUrl = (
    type: EInfoType,
    query: string,
    page?: number,
    advancedSearchOptions?: Partial<IAdvancedSearchOptions>
) => {
    const q = encodeURIComponent(query);
    const endpoint = renderTemplate(SEARCH_INFO_ENDPOINT, {type, query: q, page});
    const queryString = qs.stringify(advancedSearchOptions);
    const infix = queryString.length > 0 ? '?' : '';
    return endpoint + infix + queryString;
}

export const isAnime = (entity: any): entity is IAnime => {
    const obj = R.defaultTo({}, entity);
    return R.allPass(R.map(R.has, Object.keys(animeAlike)))(obj);
}

export const isAnimeList = (entityList: any): entityList is IAnime[] => {
    return !Array.isArray(entityList)
        ? false
        : entityList.every(isAnime)
}

export const searchAnime = (
    api: IApi,
    query: string,
    page?: number,
    advancedSearchOptions?: Partial<IAdvancedSearchOptions>
): Future<string, IAnime[]> => {
    const url = searchInfoUrl(EInfoType.anime, query, page, advancedSearchOptions);
    const response = processedResponse<IAnime[]>(api.get(url), isAnimeList);
    return response;
}