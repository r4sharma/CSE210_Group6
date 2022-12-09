# Meeting points

1. Deciding DB structure


| Name      | Type | Mandatory | Max chars | Default |
| ----------- | ----------- | ----------- | ----------- |----------- |
| Job Id      | Alphanumeric       | Y       | 200 chars       | |
| Company Name   | String        | Y        | 200 chars        | |
| Date   | Date        | Y       | NA       |  |
| Last Updated Date   | Date        | Automatic-System Date        | NA       | 
| Job Type   | Enum  (FullTime, PartTime, Internship)      | N        |        |FullTime |
| Job Role   | String        | N        | 500 chars        | |
| Status   | Enum (Applied, InProgress, Offer, Reject)       | N        |        | Applied|
| Description   | String      | N        | 5000 chars       | |

2. Every application is uniquely identified by a **Composite Key (JobId, Company Name)**
3. Default values for non-mandatory fields need to be discussed.
4. Last updated date will be updated automatically as system date.
5. Editing - Delete and update when (JobId, Company Name is changed) else only update.
6. Trim white spaces/check any cases during validation.
7. 
