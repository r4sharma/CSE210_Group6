| Name      | Type | Mandatory | Max chars | Default |
| ----------- | ----------- | ----------- | ----------- |----------- |
| Job Id      | Alphanumeric       | N       | 200 chars       | |
| Company Name   | String        | Y        | 200 chars        | |
| Date   | Date        | Y       | NA       |  |
| Last Updated Date   | Date        | Automatic-System Date        | NA       | 
| Job Type   | Enum  (FullTime, PartTime, Internship)      | N        |        |FullTime |
| Job Role   | String        | N        | 500 chars        | |
| Status   | Enum (Applied, InProgress, Offer, Reject)       | N        |        | Applied|
| Description   | String      | N        | 5000 chars       | |



1. Each record is uniquely identified by an auto-incrementing integer key.
2. Duplicate entries for a job are allowed. This is done to relax the mandatory constraint of having to enter jobId which is an overhead for an end user.