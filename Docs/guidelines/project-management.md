1. All tasks in the project will be structured as a story in Github using the Zenhub extension. 
2. The project will have broad categories of work called epics.
3. A story can be of 2 types
    1. User Story - Any code/work that directly is a part of the end user application
		For eg. 
    2. Developer Story - Any code/work that aids the development process

4. Story Open - Each story should have -
    1. A concise and easy to understand title 
    
        ```A summary of the format -
        As a user/developer,
        I want to…,
        So that…

    2. Label - as appropriate
    3. Epic - as appropriate
    4. Estimate
        This is the estimate of the time it will take to complete the task and not the due date.

        Points to be assigned as -
        * 1 - 1hr or less
        * 2 - 2hrs
        * 3 - half a day (4 hrs)
        * 5 - one day (8hrs)
        * 8 - two days (16 hrs)

        Ideally, stories should not be more than 8. If it is, it probably means that it is too big to be in one story and needs decomposition.
    5. Assignees 

6. Story In Progress - Once you have started work on the story, move it to IN PROGRESS on the zenhub board.

7. Story Review - Once ready for review, assign a reviewer in the comments section of the story. Move it to Review/QA column on the zenhub board. Make sure you have at least one review before closing the story. The reviews can be for the requirement (story text) or anything else.

8. Story Done - Once all aspects of the story are done (tests/review comments resolved), move it to done.
