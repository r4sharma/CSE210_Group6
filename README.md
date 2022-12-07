# AppTrak (CSE210_Group6)

## Introduction
<strong>AppTrak</strong> - A local first and single-user web app that saves us from the excel sheet management mess and allows us to declutter our application tracking and make it easier. 

<img src="https://github.com/r4sharma/CSE210_Group6/blob/a0720bcb269cf2b106acb92527b239a2f20de044/Docs/ADR/homepage.jpg?raw=true" alt="drawing" width="600" class="center"/>

The reason we develop it is that students from various fields of study apply for internships and jobs every year. However, keeping track of the applications and their status gets cumbersome in an Excel sheet. It results in students abandoning their efforts to keep track of their progress, often leading to missed deadlines and poor planning. This overall hinders the student learning experience and adds to their frustration.

## Features of AppTrak
- The user can create a new event in the calendar.
- The user can view already created events in the calendar.
- The user can delete an existing event in the calendar.
- The user can update an existing event in the calendar.

The application is local first: when the Internet does not work, events can be read, created, deleted, updated through the application

## Technology Architecture (Need to be checked)


## Database Design
- Each record is uniquely identified by an auto-incrementing integer key defined as "Card Id".
- Duplicate entries for a job are allowed. This is done to relax the mandatory constraint of having to enter jobId which is an overhead for an end user.

| Name      | Type | Mandatory | Max chars | Default |
| ----------- | ----------- | ----------- | ----------- |----------- |
| Card Id     | Alphanumeric       | Y(Primary Key)       | 200 chars       | |
| Job Id      | Alphanumeric       | N       | 200 chars       | |
| Company Name   | String        | Y        | 200 chars        | |
| Date   | Date        | Y       | NA       |  |
| Last Updated Date   | Date        | Automatic-System Date        | NA       | 
| Job Type   | Enum  (FullTime, PartTime, Internship)      | N        |        |FullTime |
| Job Role   | String        | N        | 500 chars        | |
| Status   | Enum (Applied, InProgress, Offer, Reject)       | N        |        | Applied|
| Description   | String      | N        | 5000 chars       | |

## Testing Strategies
### Use Jest as TestingFramework 
- Good, automatically runs tests after each change to ensure they are up to date. Many users report that this reduces development time.
- Good, automatically mocks any modules not explicitly required in the test file, which can save time during development.
- Bad, Jest has fewer features straight out of the box comparing with Mocha.

In conclusion, Jest is a better choice becasue it is easy to get started with and doesn’t require learning a new syntax

### Use Selenium as UI Testing
- Good, a collection of open-source tools that support browser application testing.The community has over 632 contributors and over 140,000 users.
- Good, Selenium is a solution dedicated to testing applications that run in multiple browsers (Chrome, Firefox, Safari, etc.) on different operating systems (Windows, Linux, and Mac OS)
- Good, the parallel execution of test suites reduces the elapsed time required to complete application testing.
- Bad, Selenese is the language used to define Selenium test scripts. It is a high level language that developers need to learn to write and execute Selenium tests. 

In conclusion, Selenium is a better choice because developers must test their apps for multiple browsers.

From the developer's point of view, the Selenium tests are helpful in simulating the interaction of the user. Thus, these tests are grouped together in the folder called **e2e_testing**.

In this project, we understand that it is impractical to expect the developers to install the libraries required to run the tests manually. But we do operate under the assumption that the developer has installed Python correctly which would mean the library **setuptools** is available as a default library, similar to how the more known **os** library is. The presence of the library enables us to write the code that automatically checks whether the required libraries are present, and installs them automatically if they aren't.

Moving on to the execution of the tests, we have created a new Selenium test for each functionality. If the developer is working in the root directory, then they can execute the individual test by typing the following command in the terminal: `python e2e_testing/test_file_name.py` where **test_file_name.py** refers to the name of the test file present in the directory. For example, to execute the test for inserting an application, we type `python e2e_testing/selenium_insert_test.py` in the terminal.

However, there might be instances where a developer wishes to run a single file that executes all the other tests. For this, the developer can execute the following command in the terminal: `python e2e_testing/selenium_all_tests.py` which executes each test one after the other. If a developer creates a new test file called **new_test.py** and wants this to run together with other tests, then they need to add the following code at the bottom of **selenium_all_tests.py**:
`os.system("python " + tests_directory_path + "new_test.py")`

The modified **selenium_all_tests.py** file will then look like this:

`os.system("python " + tests_directory_path + "test1.py")`  
`os.system("python " + tests_directory_path + "test2.py")`  
`.`  
`.`  
`.`  
`os.system("python " + tests_directory_path + "new_test.py")`

Thus, the developer can now use the `python e2e_testing/selenium_all_tests.py` command in the terminal to run the entire test suite which now includes the Selenium test file they created.

## Coding standards
- Each functions should have inline comment
- Each function and variable should named using Camel case
- Use VSCode
- Install the VSCode extension for ESLint to help lint your code
- Use the following format for naming git branches:
  - uthor_name/feature_description
  - E.g., ripunjay/configure_jsdocs

## Steps to Run the Project
1. Clone this project (or a fork of this project)

    ```git clone https://github.com/r4sharma/CSE210_Group6.git```

2. Open the repository in a terminal

    ```cd CSE210_Group6 ```

3. Install node modules

    ```npm install```

4. Build the project

    ```npm run build```

5. Start the application by opening dist/index.html in a browser

6. Repeat step 4 after any changes to the application

7. To run unit tests the application

    ```npm run test```

8. To run integration tests the application

    ```python e2e_testing/integration.py```

## Relevant Documents
- ADR                                       
  - [AsynchronousCodeStrategy](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/AsynchronousCodeStrategy.md)
  - [Database](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/Storage.md)
  - [DatabaseTesting](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/DatabaseTesting.md)
  - [UITesting](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/UITesting.md)
  - [Webpack](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/Webpack.md)
  - [GitWorkflow](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/GitWorkflow.md)
- Developing Guildline              
  - [branch-merge](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/guidelines/branch-merge.md)
  - [coding-conventions](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/guidelines/coding-conventions.md)
  - [git-conventions](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/guidelines/git-conventions.md) 
  - [jsdoc-conventions](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/guidelines/jsdoc-conventions.md)
  - [project-management](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/guidelines/project-management.md) 
- Meeting Notes
  - [Sprint 1](https://github.com/r4sharma/CSE210_Group6/tree/dev/Docs/meeting-notes/Sprint%201)
  - [Sprint 2](https://github.com/r4sharma/CSE210_Group6/tree/dev/Docs/meeting-notes/Sprint%202)
  - [Sprint 3](https://github.com/r4sharma/CSE210_Group6/tree/dev/Docs/meeting-notes/Sprint%203)
  - [Sprint 4](https://github.com/r4sharma/CSE210_Group6/tree/dev/Docs/meeting-notes/Sprint%204)
  - [Sprint 5](https://github.com/r4sharma/CSE210_Group6/tree/dev/Docs/meeting-notes/Sprint%205) 
