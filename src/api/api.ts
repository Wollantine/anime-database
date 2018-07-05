import {Future, encaseP} from 'fluture';
import { axios } from './axios';
import { AxiosError, AxiosResponse } from 'axios';
import { TMap } from './responseProcessor';

export const get: (endpoint: string) => Future<AxiosError, AxiosResponse<TMap>> = 
    encaseP(axios.get);
