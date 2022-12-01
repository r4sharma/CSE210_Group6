# Steps to create and merge individual branches

1. Fetch current version of dev branch
2. Create a new branch from dev as parent branch
3. Name the branch as <name>/<feature>
4. Add the changes in the new branch and run the following commands to ensure everything is working correctly:
    - npm i
    - npm run lint-fix
    - npm run build
5. Checkin in your branch
6. raise a oull request from the current branch to dev
7. Add a reviewer to the pull request
8. Add the user story created for this feature inside 'Developments' section of pull request.
9. Once the request is ready to merge, do a final review and merge it.
  
