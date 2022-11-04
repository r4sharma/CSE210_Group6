# Meeting Notes

Links for folder structure:
* https://ramandeep-singh-1983.medium.com/project-structure-for-modern-angular-applications-d00036c9e1ee 
* https://stackoverflow.com/questions/35807001/web-projects-folders-directories-structure-best-practices

## Preliminary Folder Structure
```
└─┬app
  |
  └─ node.js
  |
  └─┬root
    |
    |
    ├─┬libs // Js libraries 
    | |
    | └─┬bootstrap
    |   └ … (.js files)
    |
    ├─┬shared
    | |
    | ├─┬button
    | | └ … (.js files)
    | |
    | ├─┬add
    | | └ … (.js files)
    | |
    | ├─┬delete
    | | └ … (.js files)
    | |
    | ├─┬header
    | | └ … (.js files)
    | |
    | ├─┬sidebar
    | | └ … (.js files)
    | |
    | └─┬app-nagivation
    |   └ … (.js files)
    |
    ├─┬modules
    | |
    | ├─┬dashboard
    | | | 
    | | ├─stat-sample
    | | | 
    | | └─app-cards  
    | |
    | └──app-page
    |
    └index.html // web site entry point
    ```
