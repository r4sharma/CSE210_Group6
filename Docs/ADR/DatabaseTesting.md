# TestTool ADR

## Use Jest as TestingFramework

## Context and Problem Statement

As a developer, we need to verify that each part works as expected before moving on to the next phase. Therefore, we need find a test tool to write unit tests
that test whether a function works correctly in isolation from other parts of your application. 

The main problems that we want addressed are : 
 - How to do correct and efficient unit tests

## Considered Options

* Jest
* Mocha

## Decision Outcome

Chosen option: <b>"Jest"</b>

### Consequences

* Good, automatically runs tests after each change to ensure they are up to date. Many users report that this reduces development time.
* Good, automatically mocks any modules not explicitly required in the test file, which can save time during development. 
* Bad, Jest has fewer features straight out of the box comparing with Mocha.

In conclusion, Jest is a better choice becasue it is easy to get started with and doesn’t require learning a new syntax

## More Information
[Mocha vs Jest Comparison of Testing Tools in 2022](https://medium.com/@lancelyao/browser-storage-local-storage-session-storage-cookie-indexeddb-and-websql-be6721ebe32a](https://www.blog.duomly.com/mocha-vs-jest/#3-compare-mocha-vs-jest))

[Jest Tutorial](https://jestjs.io/docs/getting-started)
