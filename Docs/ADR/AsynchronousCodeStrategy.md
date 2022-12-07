# Asynchronous Code Strategy ADR

## Use Promise for Asynchronous Code

## Context and Problem Statement

IndexedDB is used for our storage, so the I/O processing causes delay which some block of code can be executed along with the 
original code thread so that execution of the code can be done in parallel. It is asynchronous. Therefore, we need to find a
method to control the asynchronous code based on JavaScript.

## Considered Options

* callback
* promise

A callback function is passed as an argument to another function whereas Promise is something that is achieved or completed in 
the future. In JavaScript, a promise is an object and we use the promise constructor to initialize a promise. To use promise 
objects we take help from promise consumers that are then() method(if promise fulfilled) and catch() method (if promise is rejected).

## Decision Outcome

Chosen option: <b>"Promise"</b>

### Consequences

* Good, improves Code Readability
* Good, better handling of asynchronous operations
* Good, better flow of control definition in asynchronous logic
* Good, better Error Handling

Promises are the ideal choice for handling asynchronous operations in the simplest manner. They can handle multiple asynchronous operations 
easily and provide better error handling than callbacks and events. In other words also, we may say that, promises are the ideal choice for 
handling multiple callbacks at the same time, thus avoiding the undesired callback hell situation. Promises do provide a better chance to a 
user to read the code in a more effective and efficient manner especially it that particular code is used for implementing multiple asynchronous 
operations. 


## More Information
[Callbacks and Promises | Explained with Examples](https://linuxhint.com/callback-promise-javascript-examples/#:~:text=A%20callback%20function%20is%20passed,constructor%20to%20initialize%20a%20promise.)
