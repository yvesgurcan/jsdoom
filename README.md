<p style="background: rgb(200, 100, 100); border: 1px solid rgb(100, 0, 0); border-radius: 4px; padding: 5px">Due to <a href="https://status.github.com/messages">GitHub Pages and Webhooks malfunctions</a>, the build of this project is currently offline. We apologize and suggest to run the <a href="#setup">Setup</a> and <a href="development">Development</a> steps explained below to run the application locally -- message posted at 10/22/2018 8:14 PT.</p>

# Doom.js

## [Play Doom.js](https://doom.yvesgurcan.com)

## [Release Notes](NOTES.md)

## [Differences with the Doom engine](VANILLA.md)

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
* <https://github.com/id-Software/DOOM/tree/master/linuxdoom-1.10>
