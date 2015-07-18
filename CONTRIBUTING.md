# Welcome

Welcome to the Card contributor guidlines. We are *so happy to have you*. No matter who you are or what your contributing background is, we want this to be a safe, fun place for you to help out.

Card follows the [Clef code of conduct](https://github.com/clef/code-of-conduct) and violations are taken very seriously. If you seem something wrong, please don't hesitate to reach out to [@jessepollak](http://twitter.com/jessepollak) through their email on Github.

There is also a strict *no meanness* rule. At every step, please be kind and inclusive, even if people are asking not-so-informed questions. 

# How do I set up for development?

Here's how you can get started developing locally:

    $ git clone --recursive https://github.com/jessepollak/card.git
    $ cd card
    $ git submodule init && git submodule update
    $ npm install
    $ npm start

Now, if you go to localhost:8080/example in your browser, you should see the demo page.

# How to contribute

Here are the basic steps to get started contributing:

1. Fork then clone the repo and get development running on your computer. You can find instructions for setting up your development environment above.
2. Replicate the issue you're trying to fix or spec out the feature you're trying to add. Understanding the scope of what you're fixing or adding is important and upfront thought helps.
3. Change the code to fix the bug or add the feature. All changes should happen in the relevant `*.coffee` and `*.scss` files. All `*.js` files are automatically build.
4. Verify that your fix or feature works. 
5. Run `NODE_ENV=production gulp build` to build your changes in the production build
6. Commit your changes with an informative description
7. Open a pull request to [the primary repo](https://github.com/jessepollak/card) with your new commit and a descriptive message about what the PR does.

# What can I contribute?

Check out the [issues](http://github.com/jessepollak/card/issues) for a comprehensive list of unfixed bugs and desired features.

## Are you new?

If you're new to open source software, it can be really scary to get started. Believe me, we've all been there. 

To make it a little less scary, we've tagged a bunch of issues with `good-first-PR` tags. These issues or features are ones that we think will be approachable for a new contributor to the project (or to open source in general). They have a ton of information in the issue that should make it easy to get started.

If you want to tackle one of these issues, we are here to help you! Ping [@jessepollak](http://twitter.com/jessepollak) and he'll walk you through everything you need to know to get started.
