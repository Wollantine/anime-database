import {expect} from 'chai';
import { searchAnime, searchInfoUrl, EInfoType, EStatus, IAnime, isAnime, objectValues, isAnimeList } from '../searchAnime';
import * as R from 'ramda';
import { AxiosResponse, AxiosError } from 'axios';
import { Future } from 'fluture';
import sinon from 'sinon';

describe('searchAnime', () => {

    const anime: IAnime = {
        malId: 1535,
        url: "https://myanimelist.net/anime/1535/Death_Note",
        imageUrl: "https://myanimelist.cdn-dena.com/r/100x140/images/anime/9/9453.jpg?s=c90aa06a7aeeb91285aab92508edd2a1",
        title: "Death Note",
        description: "A shinigami, as a god of death, can kill any personâprovided they see their victim's face and write their victim's name in a notebook called a Death Note. One day, Ryuk, bored by the shinigami lifesty...",
        type: "TV",
        score: 8.67,
        episodes: 37,
        members: 1474589
    };

    describe('searchInfoUrl', () => {
        it('should return a correct URL', () => {
            expect(searchInfoUrl(EInfoType.anime, 'Death', 1))
                .to.equal('/search/anime/Death/1');
        });

        it('should return a correct URL without page', () => {
            expect(searchInfoUrl(EInfoType.character, 'Light'))
                .to.equal('/search/character/Light/');
        });
        
        it('should encode queries', () => {
            expect(searchInfoUrl(EInfoType.manga, 'One Punch'))
                .to.equal('/search/manga/One%20Punch/');
        });

        it('should return a correct URL with some advanced search options', () => {
            expect(searchInfoUrl(EInfoType.anime, 'Note', 5, {score: 7.0, status: EStatus.complete}))
                .to.equal('/search/anime/Note/5?score=7&status=complete');
        });
    });

    describe('objectValues', () => {
        it('should return the object values', () => {
            const value1 = {a: 'hi', b: true};
            const value2 = {a: 'bye', b: false};
            expect(objectValues({value1, value2} as any)).to.deep.equal([value1, value2]);
        });

        it('should return an empty array for an empty object', () => {
            expect(objectValues({} as any)).to.deep.equal([]);
        });

        it('should return an empty array for a null', () => {
            expect(objectValues(null as any)).to.deep.equal([]);
        });
    });

    describe('isAnime', () => {
        it('should return true for a valid anime', () => {
            expect(isAnime(anime)).to.be.true;
        });

        it('should return false for an anime with missing properties', () => {
            const fakeAnime = R.omit(['url', 'title'], anime);
            expect(isAnime(fakeAnime)).to.be.false;
        });

        it('should return false for an empty object', () => {
            expect(isAnime({})).to.be.false;
        });

        it('should return false for a null value', () => {
            expect(isAnime(null)).to.be.false;
        });
    });

    describe('isAnimeList', () => {
        it('should return true for a hashmap of anime objects', () => {
            const animeList = {
                0: anime,
                1: anime,
                2: anime,
            };
            expect(isAnimeList(animeList)).to.be.true;
        });

        it('should return false for a hashmap of other values', () => {
            const randomList = {
                0: 'text',
                1: true,
                2: 42,
            };
            expect(isAnimeList(randomList)).to.be.false;
        });

        it('should return false for another type of value', () => {
            expect(isAnimeList(anime)).to.be.false;
        });
    });

    describe('searchAnime', () => {
        it('should call api.get with the endpoint URL', () => {
            const response = {
                data: [anime],
            } as AxiosResponse;
            const api = {get: sinon.fake.returns(Future.of(response))}
            const expectedUrl = '/search/anime/test/1?status=airing';
            return searchAnime(api, 'test', 1, {status: EStatus.airing}).fork(
                (e) => {throw new Error(e)},
                (res) => expect(api.get.calledWith(expectedUrl)).to.be.true,
            );
        });

        it('should return a Future of the anime if the request responded correctly', () => {
            const response = {
                data: [anime]
            } as AxiosResponse;
            const api = {get: () => Future.of(response)};
            return searchAnime(api, 'test').fork(
                (e) => {throw new Error(e)},
                (res) => expect(res).to.deep.equal([anime]),
            );
        });

        it('should return a Future of error string if the request failed', () => {
            const error: AxiosError = {
                config: {},
                name: '',
                message: 'Shit happened',
                code: '500',
            };
            const api = {get: () => Future.reject(error)};
            return searchAnime(api, 'test').fork(
                (error) => expect(error).to.deep.equal('Axios error: 500'),
                () => {throw new Error()},
            );
        });
    });
});
