import {Future} from 'fluture';
import { AxiosError, AxiosResponse } from 'axios';
import * as R from 'ramda';

export type TMap = {[key: string]: any};
type TMapper = (key: string) => string;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const snakeCaseToCamelCase = (snakeCase: string): string => {
    return snakeCase
        .split('_')
        .map((part, index) => index === 0 ? part : capitalize(part))
        .join('');
}

export const mapObjectKeys = R.curry((mapper: TMapper, obj: TMap): any => {
    return Object.keys(obj).reduce((acc: TMap, k) => ({
        ...acc,
        [mapper(k)]: obj[k],
    }), {});
});

export const processData = <T extends TMap>(data: T | T[]): TMap => {
    const isArray = Array.isArray(data);
    return isArray
        ? (data as T[]).map(mapObjectKeys(snakeCaseToCamelCase))
        : mapObjectKeys(snakeCaseToCamelCase, data);
}

export const processedResponse: <T>(
    response: Future<AxiosError, AxiosResponse<any>>,
    hasEntityType: (result: any) => boolean,
) => Future<string, T> = (response, hasEntityType) => {
    return response
        .mapRej(R.pipe(R.propOr('Unknown', 'code'), x => 'Axios error: ' + x))
        .map(R.path(['data', 'result']))
        .chain(data => R.isNil(data) ? Future.reject('response.data.result is empty') : Future.of(data))
        .map(processData)
        .map(R.tap(console.log))
        .chain(entity => hasEntityType(entity) ? Future.of(entity) : Future.reject('Unexpected response format: ' + JSON.stringify(entity)));
}
