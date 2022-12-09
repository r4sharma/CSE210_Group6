# CICD ADR

## Use GitHub Actions for Configuring CICD Pipeline

## Context and Problem Statement

As developers, we want to set up an automated Continuous Integration and Continuous Development (CICD) pipeline that builds, tests, and deploys our project code. By enabling automation in our development process, we ensure that all the stages of the process are validated automatically as we commit our changes, which in turn ensures that we have fewer bugs and merge conflicts. Having an automated CICD pipeline also facilitates the fast and efficient setup of a bundled artifact into the production environment. 

The main problems that we want addressed are : 
 - How to implement a CICD pipeline that integrates easily with our GitHub repository.
 - How to enable efficient testing by automating our tests as part of the CICD setup.
 - How to ensure efficient setup of our bundled artifact into the production environment.

## Considered Options

* GitHub Actions
* Jenkins
* CircleCI

## Decision Outcome

Chosen option: <b>"GitHub Actions"</b>

### Consequences

* Good, native compatibilities offered right into the project GitHub flow.
* Good, ability to utilize several pre-written, tested automations and CICD actions in the GitHub marketplace.
* Good, easy setup of Jest or other test/build frameworks with the help of easy-to-interpret YAML files.
* Good, Virtual Machines hosted on multiple operating systems.
* Good, Free to use on public repositories.

To conclude, GitHub Actions suited us owing to their fast and efficient setup and their compatibility with the GitHub repository.

## More Information
[GitHub Actions - Official Doc](https://docs.github.com/en/actions)

[Configure Jest to the CICD Pipeline](https://medium.com/@trevorjperez1/add-jest-to-your-ci-cd-pipeline-with-github-actions-b369c0079173)