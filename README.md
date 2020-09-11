


# Recipe Analyser: Dynamic React Project

A dynamic web application built using the React framework, utilising firebase as an authentication and database platform.

## Preview

[View the Recipe Analyser here](https://react-recipe-project-87fc0.web.app/auth)

## Motivation

The idea for this web application stemmed from conversations with cafe owners and food enthusiasts who were eager to expand their cooking repertoire and lost motivation after being bombarded with page-freezing advertisements and over saturated page content. This gave me the opportunity to enhance my experience of working with API's, whilst creating something to relieve frustration and reignite a passion for cooking.

## Design

The target audience for this recipe analyser is one of young cooking enthusiasts. With an increased focus on health and plant-based living in younger audiences the built-in search function for this app will look for any plant-based recipes matching the queried term. The color base for this website is a natural green to emphasise the applications focus on plant-based cuisine (It is still possible to add your own/modify recipes to include meat and dairy). Furthermore, the "Cookie" font was chosen for headings and key areas with the intention of creating a personalised recipe book feel to this app.

## Features

As with any recipe book, this one is designed to end up covered in notes and modifications. Any user who registers with this web app can use it's entire feature-set, including:
* Parsing a recipe from any blog page using the "Add new recipe" function
* Search in the internal database for plant-based recipe inspirations
* Edit all components of any recipe
* Add or remove notes and tags from any recipe
* Adjust serving size to required number
* Search personal saved recipes for a matching query parameter and/or matching tags
* Add/remove tags used for filtering from user data
* Modify username associated with account

## API's

**Spoonacular**: The foundation of this website. The Database is used for the interior search functionality and the "extract recipe details" endpoint is called when a single recipe is clicked, providing the full recipe. The "custom recipe" endpoint is called when a url is pasted in to the text input on the "/Add" route.

## Coming In Future Updates

* Functionality to add own recipe from scratch
* Creating a new sharable route with "/:recipeId/share" to clone a friend's saved recipe
* Increased accessability support
* Removing non-DRY code
* Refactoring CSS for an easy-to-read layout
* More differentiation between Login and SignUp screens


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

