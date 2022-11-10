# Storage ADR

# Use Gitflow as our Git Workflow Strategy

## Context and Problem Statement

Every team has its own workflow based on the type of project, company size, team preferences, and many other things. Git is one of the best version control available now. 
It is so flexible. We can create our own workflow strategy using git. The main well-known workflows for git are :
 - Basic Workflow
 - Feature Branch Workflow
 - Git Flow
 - Gitlab flow

The main problems that we want addressed are : 
 - How to control version well?
 - How to cooperate with less code conflicts?
 - How to let every teamate has the ability to solve code conflicts?

## Considered Options

* Basic Workflow
* Feature Branch Workflow
* Git Flow

## Decision Outcome

Chosen option: <b>"Git Flow"</b>
![image info](gitflow_instruction.jpg)

### Consequences

* Good, Git Flow is used by a lot of distributed, open-source teams that have varying skill levels. The project maintainers can review and approve every line of code going into releases.
* Good, Git Flow can work well for a traditional release model, where releases are done in terms of months and weeks.
* Good, Git Flow also works well when dealing with an established product or multiple versions in production.
* Bad, Git Flow can slow things down when having to look at large pull requests if you are trying to iterate quickly.
* Bad, Releases are hard to do more than once a week.
However, these two bad situations could be avoided because we do not need to release the project once a week and we do not have a lot of pull requests.

### Gitflow Command Diagram 
![image info](gitflow.png)
