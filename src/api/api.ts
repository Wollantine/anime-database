import {Future, encaseP} from 'fluture';
import { axios } from './axios';
import { AxiosError, AxiosResponse } from 'axios';
import { TMap } from './responseProcessor';

export interface IApi {
    get: (endpoint: string) => Future<AxiosError, AxiosResponse<TMap>>;
}

export const Api: IApi = {
    get: encaseP(axios.get),
};
