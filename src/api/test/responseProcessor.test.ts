import {expect} from 'chai';
import { capitalize, snakeCaseToCamelCase, mapObjectKeys, processedResponse } from '../responseProcessor';
import { AxiosError, AxiosResponse } from 'axios';
import { Future } from 'fluture';

describe('responseProcessor', () => {
    describe('capitalize', () => {
        it('should capitalize only the first character', () => {
            expect(capitalize('hello world.')).to.equal('Hello world.');
        });

        it('should keep the first character capitalized', () => {
            expect(capitalize('Hello!')).to.equal('Hello!');
        });

        it('should do nothing on an empty string', () => {
            expect(capitalize('')).to.equal('');
        });
    });

    describe('snakeCaseToCamelCase', () => {
        it('should convert snake_case to camelCase', () => {
            expect(snakeCaseToCamelCase('test_key')).to.equal('testKey');
        });

        it('should keep the rest of the capitalization and symbols', () => {
            expect(snakeCaseToCamelCase('this is a test_Key!')).to.equal('this is a testKey!');
        });

        it('should do nothing on an empty string', () => {
            expect(snakeCaseToCamelCase('')).to.equal('');
        });
    });

    describe('mapObjectsToKeys', () => {
        const obj = {a: 'a', b: 'b'};
        const mapper = key => key === 'a' ? 'test' : key;

        it('should change the object keys as per the mapper', () => {
            expect(mapObjectKeys(mapper, obj)).to.deep.equal({test: 'a', b: 'b'});
        });

        it('should be curried', () => {
            expect(mapObjectKeys(mapper, obj)).to.deep.equal(mapObjectKeys(mapper)(obj));
        });

        it('should do nothing on an empty object', () => {
            expect(mapObjectKeys(mapper, {})).to.deep.equal({});
        });

        it('should not mutate the original', () => {
            expect(mapObjectKeys(mapper, obj)).to.not.equal(obj);
        });

        it('should behave as an identity with an identity mapper', () => {
            expect(mapObjectKeys(x => x, obj)).to.deep.equal(obj);
        });

        it('should be associative', () => {
            const mapper2 = key => key + key;
            expect(mapObjectKeys(mapper2, mapObjectKeys(mapper, obj)))
                .to.deep.equal(mapObjectKeys(key => mapper2(mapper(key)), obj));
        });
    });

    describe('processedResponse', () => {
        const axiosError: AxiosError = {
            config: {},
            code: '404',
            name: '',
            message: 'Resource not found',
        };
        const axiosResponse: AxiosResponse = {
            data: {result: {}},
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const isEntity = () => true;

        it('should extract error code from AxiosError', () => {
            const request = Future.reject(axiosError);
            return processedResponse(request, isEntity).fork(
                (error) => expect(error).to.contain('404'),
                () => {throw new Error()},
            );
        });

        it('should extract data from AxiosResponse', () => {
            const data = {result: {test: '42'}};
            const request = Future.of({...axiosResponse, data});
            return processedResponse(request, isEntity).fork(
                () => {throw new Error()},
                (response) => expect(response).to.deep.equal(data.result),
            );
        });

        it('should return a Future with error if data is empty', () => {
            const data = null;
            const request = Future.of({...axiosResponse, data});
            return processedResponse(request, isEntity).fork(
                (error) => expect(error).to.be.a('string'),
                () => {throw new Error()},
            );
        });

        it('should return a Future with error if data does not fulfill hasEntityType', () => {
            const request = Future.of(axiosResponse);
            return processedResponse(request, () => false).fork(
                (error) => expect(error).to.be.a('string'),
                () => {throw new Error()},
            );
        });

        it('should camelCase all data keys', () => {
            const data = {result: {'random_key': 'randomValue'}};
            const request = Future.of({...axiosResponse, data});
            return processedResponse(request, isEntity).fork(
                () => {throw new Error()},
                (response) => expect(response).to.deep.equal({randomKey: 'randomValue'}),
            );
        });
    });
});
