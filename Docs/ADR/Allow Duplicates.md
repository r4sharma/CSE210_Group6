# Allow Duplicates ADR

## Context and Problem Statement

As a user of AppTrak, I want to add applications using the add user feature.
The user can add any number of applications. Each application has several fields, however not all of them are mandatory.
This brings up a question whether the app should allow duplicate entries of the application.

In our discussion with the TA, we received feedback for enforcing checking and preventing duplicates. We agree to the points made, and initially also had the same database schema in mind. Refer xxx. 

In this ADR, we provide the reasoning of why we believe preventing duplicates is not a good choice in the context of this project.

## Considered Options

* Avoid duplicates by a composite key of Job ID and Company Name
* Do not prevent duplicates and have an auto-increment integer key

## Decision Outcome

Chosen option: <b>"Do not prevent duplicates and have an auto-increment integer key"</b>

### Reasoning

For a typical user(mostly a student), the most common items that a user wants to save as a part of the application is the 
1. Company Name
2. Status
3. Type (Full-Time/Internship etc)

A user may typically apply to several roles and job ids of the same company. For example a user may apply to SDE I, University Grad, ML Engineer for the same company, like Amazon.

While some users would like to save all the fields, most users would be interested in saving the above fields as finding and making note of jobIds would be an overhead. Forcing the users to look for and add such fields, would make it tedious for the user to use the application and thus decrease user retention.

Thus, in the interest of typical user behavior for this application, we chose to avoid checking duplicates using the above mechanism.

We can think of more sophisticated means of preventing duplicates while maintaining user interests as a part of our future goals.
