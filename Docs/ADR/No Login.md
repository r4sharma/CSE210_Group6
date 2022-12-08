# Allow Duplicates ADR

## Context and Problem Statement

In our discussion with the TA, we received feedback for creating a login page for the application.

In this ADR, we provide the reasoning of why chose to keep the login functionality out of scope for the current version of the application.

## Considered Options

* Have a login page
* Do not have a login page

## Decision Outcome

Chosen option: <b>"Do not have a login page"</b>

### Reasoning

Keeping in mind the local-first nature of this application as layed out in the project specification, we came up with a project idea for storing and tracking job applications. The app would store job applications on the user's device. Also, since job application information is very personal, a user would not want their data to be shared and stored in somebody else's device. Thus, given that the app would store data only for the given user, a login feature for the same user would not add value.

However, we do appreciate the feedback, and may consider a more sophisticated login mechanism for AppTrak in the future.