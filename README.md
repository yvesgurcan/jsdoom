# JS Doom

## [Play](http://doom.yvesgurcan.com)

## [TODO](TODO)

## Setup

```npm install```

## Development

```npm run dev```

* A Node server will be running on `http://localhost:3000` (default) to serve files.

* `webpack` will watch and compile the source code of the client into `client/dist`.

To start the server only, use `npm run dev:server`.

To build and watch the client only, use `npm run dev:client`.

## Deployment

```npm run build```

The client gets built in `client/dist`. The entry point of the application is an `index.html` file at the root of this project.

It is not necessary to run the server to deploy this application.

## Resources

* <https://lodev.org/cgtutor/raycasting.html>
* <https://dev.opera.com/articles/3d-games-with-canvas-and-raycasting-part-1>
* <https://dev.opera.com/articles/3d-games-with-canvas-and-raycasting-part-2>