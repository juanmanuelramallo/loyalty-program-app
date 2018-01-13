# [Loyalty Program App](http://loyalty-program-app.herokuapp.com/)
Code challenge from Aerolab

## Dependencies
* React
* Axios
* Sass
* Moment

## To run locally
* Run `yarn install`
* And then `yarn start`
* For simplicity the .env file has been already loaded 🤖
  * It needs to have the key `REACT_APP_API_URL` set to the proper api url
  * And also the `REACT_APP_API_KEY` with the proper api key

## To add points
* As this is not intended to be done from the end user, I just added a function to the main component in order to call it and have 1k more points
* With React Dev Tools installed:
   * Go to the React Dev Tools tab
   * Click on the App (in local) or < t > (in production)
   * Go to the console tab
   * Write `$r.handleAddPoints()` and return
   * Voilá, our dear John Kite has 1000 more points 🍻

## Deployment
* With Heroku
* The URL of the app is: http://loyalty-program-app.herokuapp.com

## To-Do
* Tests 😢

----

#### A few words for the challenge
* I think the create date of a product (not in history but in general) is missing. It's needed to implement `most recent` filter
* `buy-blue.svg` and `buy-white.svg` don't have the same sizes 🤷‍♂️
