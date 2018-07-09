# Anime Database

An online anime database SPA, using http://jikan.moe/ API to retrieve anime data from MyAnimeList.

Implemented with [MaterialUI](https://material-ui.com/), React, Redux, [Redux Saga](https://github.com/redux-saga/redux-saga), and some Functional Programming goodies, like:

- Typescript (via @babel/preset-typescript + tsc)
- [Fluture](https://github.com/fluture-js/Fluture)
- [TSMonad](https://github.com/cbowdon/TsMonad)

## Online

You can see the app online here: (https://kwirke.github.io/anime-database/).

## Usage

Clone the project, `npm i` it, and start the project with:

```
npm start
```

Or generate static HTML + JS files in dist/ by running:

```
npm run build
```

Test it (running Mocha & Chai):

```
npm test
```

And typecheck it:

```
npm run typecheck
```

It will also run `test && typecheck` automatically before commit, thanks to Husky.
