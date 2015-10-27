# electron-dev-env
live reload electron development environment

uses:
- `gulp`
- `browserify`
- `babelify`
- `electron-connect`

the app's content itself is made of:
- `html` index file
- `css` files
- `react` components

## Install
_tested on ubuntu 14.04_

`npm install -g electron-prebuilt`

`git clone https://github.com/rmi7/electron-dev-env.git`

`cd electron-dev-env`

`NODE_ENV=development npm install`

## Usage
to start the livereload electron environment type: `gulp start`

now you can edit:

- react components in `src/js`
- the index html file in `src/html`
- the css files in `src/css`

and gulp will:

1. build the files into `dist/`
2. **reload** the browser to show the updated content

if you edit `main.js` gulp will **restart** electron

## More Info
check out [electron-connect](https://github.com/Quramy/electron-connect) documentation

## License
MIT
