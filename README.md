[![Build Status](https://travis-ci.com/hadeoh/TwiClone.svg?branch=develop)](https://travis-ci.com/hadeoh/TwiClone) [![Maintainability](https://api.codeclimate.com/v1/badges/d09c74fc25127a7321fc/maintainability)](https://codeclimate.com/github/hadeoh/TwiClone/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d09c74fc25127a7321fc/test_coverage)](https://codeclimate.com/github/hadeoh/TwiClone/test_coverage)

# TwiClone

TwiClone is a simple project which clone twitter simply

## Brief Description

- There are two collections for this project which are the User and Tweet collections.
- A user model contains the user details and is tied to all the followers, those follwing and tweets for that particular user.
- A tweet model contains the tweet details and the replies to the tweets.
- User should be able to sign up with the username compulsory to be filled during registration.
- User should be able to login with the combination of email/phone/username and password.
- User should be able to post a tweet.
- User should be able to reply a tweet and the reply should also be posted as a tweet for the user(a basic replication of twitter replies).
- User should be able to follow other users, and a user can unfollow a followed user.
- User should be able to view own timeline i.e tweets of the people he/she is following and also own tweets. Furthermore, a user should be able to view his picture on his/her timeline
- User should be able to search for tweets and other users with the same keyword for searching. The repsonse is displayed based on the values matching the keyword in both collections

## API Deployment

API is deployed [here](https://twiclone1960.herokuapp.com)

## API Documentation

The documentation for API is [here](https://quickfoodvp.postman.co/collections/6841767-571d581f-df6c-4510-83aa-ea4d8bc5ffa4?version=latest&workspace=f9a9110e-2dc9-4f05-845e-2f4b687f3a0c)

## Built with

- NodeJS
- ExpressJS
- MongoDB
- JavaScript

## Getting Started

### Installation

- Clone this repository using git clone https://github.com/hadeoh/TwiClone.git .
- Use the .env.example file to setup your environmental variables and rename the file to .env
- Run yarn to install all dependencies
- Run yarn start to start the production server
- Run yarn start:dev to start the development server

### Supporting Packages

#### Linter

- [ESLint](https://eslint.org/)

#### Compiler

- [Babel](https://babeljs.io/)

#### Test Tools

- [Jest](https://jestjs.io/) - JavaScript Test Framework for API Tests (Backend)
- [Supertest](https://www.npmjs.com/package/supertest) - TDD/BDD Assertion Library for Node
- [Istanbul(nyc)](http://chaijs.com/) - Code Coverage Generator
- [Coveralls](https://coveralls.io/) - Coveralls for testing after successful CI from Travis
- [TravisCI](https://travis-ci.org) - Travis CI for continuous integration(CI)

### Authorization

- [JWT](https://jwt.io/) - JSON Web Token

### Database Mapper

- [Mongoose](https://mongoosejs.com/) - ODM (Object -Document Mapper) for MongoDB, into a simple RESTful API.

### Testing

- Run test
  `yarn test`

- Run coverage report
  `yarn test:coverage`

## API Routes

|       Description       | HTTP Methods |            Routes            |
| :---------------------: | :----------: | :--------------------------: |
|     Sign up a user      |     POST     |      api/v1/auth/signup      |
|      Log in a user      |     POST     |      api/v1/auth/login       |
|      Post a tweet       |     POST     |        api/v1/tweets         |
|     Reply to tweet      |     POST     | api/v1/tweets/:tweetId/reply |
|   Follow other users    |     PUT      | api/v1/users/:userId/follow  |
|    View own timeline    |     GET      |   api/v1/users/ownTimeline   |
| Search(Tweetsand Users) |     GET      | api/v1/search/userAndTweets  |

## Project References

- Stack Overflow
- MongoDB documentaion
- Mongoose Documentaion
- Jest Documentation
