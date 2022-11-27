
# Webpack ADR

# Use Webpack for bundling the code

## Context and Problem Statement

The production code has to provide the end-user with a single file that can be used to launch the application. Thus, a bundler is required that combines many JavaScript files into a single one that is production-ready loadable in the browser of the end-user. In this project, Webpack is used.

Without webpack, the application would require a webserver to be started - in this case localhost. With webpack, all dependencies are pre-compiled and ready for use offline and without a live server.

## Considered Options

* Rollup
* Vite
* Webpack

Rollup doesn't have code splitting available which means that the bundle.js generated of a large size will have to be loaded entirely by the browser. Vite, while having its merits, is a newer bundler that doesn't have a lot of documentation as compared to Webpack. In addition, Webpack supports code splitting which makes it the best suited choice out of the three options.

## Decision Outcome

Chosen option: <b>"Webpack"</b>

### Consequences

* Good, utilizes code splitting and uses other chunks on a need basis
* Good, helps in achieveing modularity
* Good, helps avoid issues faced due to global scope

Webpack is a good choice for bundling JavaScript code to obtain a single file that is ready for production use by the end-user. It enables good coding practices by encouraging modularity in the form of ESM or CommonJS. Finally, it is useful as it can support assets such as images and stylesheets.


## More Information
[What is Webpack and what are its advantages?](https://blog.jakoblind.no/whats-the-advantage-with-webpack/)