import {Future} from 'fluture';
import { AxiosError, AxiosResponse } from 'axios';
import * as R from 'ramda';

export type TMap = {[key: string]: any};
type TMapper = (key: string) => string;

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const snakeCaseToCamelCase = (snakeCase: string): string => {
    return snakeCase
        .split('_')
        .map(capitalize)
        .join('');
}

const mapObjectKeys = R.curry((mapper: TMapper, obj: TMap): any => {
    return Object.keys(obj).reduce((acc: TMap, k) => ({
        ...acc,
        [mapper(k)]: obj[k],
    }), {});
});

export const processedResponse: <T extends TMap>(
    response: Future<AxiosError, AxiosResponse<any>>,
    hasEntityType: (result: any) => boolean,
) => Future<string, T> = (response, hasEntityType) => {
    return response
        .mapRej(R.prop('message'))
        .map(R.prop('data'))
        .chain(data => R.isNil(data) ? Future.reject('response.data is empty') : Future.of(data))
        .map(mapObjectKeys(snakeCaseToCamelCase))
        .chain(entity => hasEntityType(entity) ? Future.of(entity) : Future.reject('Unexpected response format'));
}
