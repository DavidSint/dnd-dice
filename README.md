# D&D Dice 🎲

The frontend of a Dice rolling application designed to be used with [dice-server](https://github.com/DavidSint/dice-server).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Installation 🔧

1. To install run `npm i`
1. You will need to create a `.env` file with the websocket URL where your dice-server is running. You can copy the example by running `cp .env.example .env`.
1. Then to start the app in development mode, run `npm start`

The site will be available on [http://localhost:3000](http://localhost:3000) and will hotreload after edits.

### Testing 🧪

Yeah, this app was to be built quickly, not built well. There are no tests yet, however the jest framework is ready on `npm test`

### Build 🔨

Run `npm build` which will productionise the app into the `/build` folder.