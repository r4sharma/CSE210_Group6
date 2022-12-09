# AppTrak (CSE210_Group6)

# Table of contents
1. [Introduction](#introduction)
2. [Features of AppTrak](#features)
3. [Technology Architecture](#architecture)
4. [Database Design](#database)
5. [Testing Strategies](#testing)
6. [Coding standards](#coding)
7. [Steps to Run the Project](#run)
8. [Relevant Documents](#documents)

## Introduction <a name="introduction"></a>
Every year, students from various fields of study apply for internships and jobs. However, keeping track of the applications and their status gets cumbersome in an Excel sheet, looking something like:

<img src="https://github.com/r4sharma/CSE210_Group6/blob/f10fa3761de43fc6730db711ff9fa93187137392/Docs/ADR/OldAppTrak.png?raw=true" alt="drawing" width="600" class="center"/>

This usually results in students abandoning their efforts to keep track of their progress, often leading to missed deadlines and poor planning. This overall hinders the student learning experience and adds to their frustration.

To tackle this problem, we propose a solution – 

<strong>AppTrak</strong> - A local first and single-user web app that saves us from the excel sheet management mess and allows us to declutter our application tracking and make it easier. 

<img src="https://github.com/r4sharma/CSE210_Group6/blob/ad51b03be02cbac454892c55b7cee977ae199907/Docs/ADR/homepage.jpg?raw=true" alt="drawing" width="600" class="center"/>

## Features of AppTrak <a name="features"></a>
- The user can create a new application in the dashboard.
- The user can view already created application in the dashboard.
- The user can delete an existing application in the dashboard.
- The user can update an existing application in the dashboard.
- The user can see the statistical data of applications.
- The user can download the applications in format of a CSV file.

The application is local first: when the Internet does not work, events can still be read, created, deleted, updated through the application

## Technology Architecture <a name="architecture"></a>
AppTrak is Front-end only web application with both client-side rendering and server-side rendering. Server-side rendering is run once when the initial page is loaded. Then, the UI change is rendered on client-side based on user interaction.

<img src="https://github.com/r4sharma/CSE210_Group6/blob/f10fa3761de43fc6730db711ff9fa93187137392/Docs/ADR/rendering.jpg?raw=true" alt="drawing" width="600" class="center"/>


## Database Design <a name="database"></a>
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

## Testing Strategies <a name="testing"></a>
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

## Coding standards <a name="coding"></a>
- Each functions should have inline comment
- Each function and variable should named using Camel case
- Use VSCode
- Install the VSCode extension for ESLint to help lint your code
- Use the following format for naming git branches:
  - uthor_name/feature_description
  - E.g., ripunjay/configure_jsdocs

## Steps to Run the Project <a name="run"></a>
1. Clone this project (or a fork of this project)

    ```git clone https://github.com/r4sharma/CSE210_Group6.git```

2. Open the repository in a terminal

    ```cd CSE210_Group6 ```

3. Install node modules

    ```npm install```
    
4. To run unit tests

    ```npm run test```
    
5. To run integration tests

    ```python e2e_testing/selenium_all_tests.py```
    
6. To run lint check

    ```npm run lint```

7. To fix lint errors (if any)

    ```npm run lint-fix```

8. Compile the JSDoc

    ```npm run doc```

9. Build the project

    ```npm run build```

10. Start the application by opening src/index.html in a browser

11. Access the JSDoc by opening docs/jsdoc/index.html in a browser

12. Repeat steps 4 to 9 after any changes to the application

## Relevant Documents <a name="documents"></a>
- ADR                                       
  - [AllowDuplicates](https://github.com/r4sharma/CSE210_Group6/blob/Yinchao/ReadMe/Docs/ADR/AllowDuplicates.md)
  - [AsynchronousCodeStrategy](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/AsynchronousCodeStrategy.md)
  - [CICD](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/CICD.md)
  - [NoLogin](https://github.com/r4sharma/CSE210_Group6/blob/Yinchao/ReadMe/Docs/ADR/NoLogin.md)
  - [Database](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/Storage.md)
  - [DatabaseTesting](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/DatabaseTesting.md)
  - [UITesting](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/UITesting.md)
  - [Webpack](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/Webpack.md)
  - [GitWorkflow](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/GitWorkflow.md)
  - [UI](https://github.com/r4sharma/CSE210_Group6/blob/dev/Docs/ADR/UI.md)
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

## Owners
This project is created by:

- [Alex Martakis](https://github.com/Sikatram)
- [Mohammad Anas Mudassir](https://github.com/Anas-7)
- [Purva Kothari](https://github.com/pk38)
- [Ripunjay Sharma](https://github.com/r4sharma)
- [Savani Suranglikar](https://github.com/savani12)
- [Siddharth Bagdi](https://github.com/sidbagdi)
- [Yinchao He](https://github.com/CSE210YinchaoHe)

Please reach out in case of queries.
