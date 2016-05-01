# Ethcore Application

The project can be seen [here](http://ngotchac-ethcore.surge.sh/).

This is the project for an application to a job at [Ethcore.io](https://ethcore.io/).

The `advert.js` file (downloaded from [here](https://ethcore.io/javascript_advert.js))
has been slightly modified in order, first, to export the `job` Object, and
there has been some mistakes in the `technologies` section, where there was
multiples `oneof` keys. So these has been changed too.

This project has been written with React, built with Webpack, and deployed too
Surge.

## Development

To run this project locally:
```bash
git clone https://github.com/ngotchac/ethcore-application.git
cd ethcore-application
npm install
npm start
```

This will run the `webpack-dev-server` and watch the files for change.
The page will be automatically refreshed with Webpack Hot Loader.

## Build & Deploy

Simply run
```bash
npm run build
```

However, it will try to deploy to surge at ngotchac.surge.sh, so without
my account, you won't be able to...

Cheers!
