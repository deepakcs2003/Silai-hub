# Contributing to Silai

First off, thank you for considering contributing to Silai! It's people like you that make Silai such a great tool.

## Where do I go from here?

If you've noticed a bug or have a question, [search the issue tracker](https://github.com/your-repo/issues) to see if someone else in the community has already created a ticket. If not, feel free to create a new one!

## Fork & create a branch

If you're looking to contribute to the code, the first step is to fork this repo and create a new branch from `main`.

```
git checkout -b my-new-branch
```

## Setting up the development environment

### Backend

To get the backend running, you'll need to have Node.js and npm installed. From the `backend` directory, run:

```
npm install
```

You'll also need to create a `.env` file in the `backend` directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Once that's done, you can start the backend server with:

```
npm start
```

### Frontend

To get the frontend running, you'll need to have Node.js and npm installed. From the root directory, run:

```
npm install
```

Once that's done, you can start the frontend development server with:

```
npm start
```

## Coding style

Please follow the existing coding style. We use Prettier to format our code, so please make sure you have it set up in your editor.

## Submitting a pull request

When you're ready to submit a pull request, please make sure to do the following:

1.  Run `npm test` to make sure all the tests are passing.
2.  Update the `README.md` if you've made any changes to the API.
3.  Squash your commits into a single commit.
4.  Push your branch to your forked repo.
5.  Create a pull request from your forked repo to the `main` branch of this repo.

Once you've submitted a pull request, one of the maintainers will review it and provide feedback. We'll do our best to review it as quickly as possible!

Thank you for contributing!
