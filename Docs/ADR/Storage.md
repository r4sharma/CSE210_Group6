# Storage ADR

# Use IndexedDB for storage

## Context and Problem Statement

We want to find a scalable storage option to store the information about the applications.
The main problems that we want addressed are : 
 - How to persist the applications data added by the user offline?
 - How to store data in a format that is easily retrievable and updatable?
 - How to store our information using multiple tables?

## Considered Options

* IndexedDB
* LocalStorage
* Sqlite3

## Decision Outcome

Chosen option: <b>"IndexedDB"</b>

### Consequences

* Good, because can store large amounts of data.
* Good, because doesn't need an internet connection to persist data.
* Good, because it is transactional and asynchronous.
* Good, because can persist multiple tables.
* Bad, because more complicated and stores data in a blob.

## Pros and Cons of the Options

### IndexedDB

[Homepage](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

IndexedDB is a <b>large-scale object store</b> built into the browser. It lets you store and retrieve objects that are indexed with a key; any objects supported by the structured clone algorithm can be stored.

Example: <b>Google Docs</b> uses the IndexedDB to store the cached documents in the browser and synchronizes with the server once in a while. This allows Google Docs to increase performance while enhancing user experiences.

* Good, because it is a low-level API for client-side storage of significant amounts of structured data.
* Bad, because difficult to update blob data.
* Bad, because follows a same-origin policy. So while you can access stored data within a domain, you cannot access data across different domains.

### LocalStorage

[Homepage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

LocalStorage stores key-value pairs in a web browser with no expiration date and it is a property provided by Web Storage API.

* Good, stores data in a very easy "string" format, easy to maintain.
* Bad, because it can only store strings, can be restricting.
* Bad, because cannot have multiple tables.
* Bad, because have a memory limit for storage, around 5MB.

### Sqlite3

[Homepage](https://www.sqlite.org/index.html)

SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. 

* Good, because it is straightforward query and parameter binding interface
* Good, because provides for cross browser support.
* Bad, it is a third party storage library.
* Bad, because expects synchronous reads and writes, which may cause poor performance, and even inconsistencies.
* Bad, has many more features that we do not require.

## More Information
[Browser storage: Local Storage, Session Storage, Cookie, IndexedDB and WebSQL](https://medium.com/@lancelyao/browser-storage-local-storage-session-storage-cookie-indexeddb-and-websql-be6721ebe32a)
