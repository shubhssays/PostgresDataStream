# PostgresDataStream

This app shows how can we stream data from postgresql database in the form of json. We can use this wherever we want to retrieve large amount of data from database. This mechanism reduces load on database and RAM consumption.

Suppose, users table contains millions of  rows and for some reason we want to fetch them all. So, instead of fetching
the data all at once, we will fetch them in chunks.

To start server,

1. npm i
2. node server.js
