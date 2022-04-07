# Webpack Template
My Webpack React config with Typescript, Redux, React Router, SASS, linters and pre-commit hooks. Using Yarn as package manager.

## Getting started
1. In your terminal run command `yarn install` for installing all required packages
2. Run `yarn husky install` to enable husky git hooks
3. Run `yarn start` to start app on localhost in development mode

## Available scripts
+ `yarn start` - starting app on `localhost:1313` in development mode with hot reload. You can change local port in `webpack/webpack.dev.js (line 10)`
+ `yarn build` - builds production version into `build` folder. Destination can be changed in `webpack/webpack.common.js (line 53)`
+ `yarn lint` - lints all files in `src` directory

