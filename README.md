# CMPSCI 326 Web Programming: Team King Pine

# Chirper

## Chirper helps you keep tabs on what you care about most

### How to Run
Our application can be run by running 'node app.js' in the root directory of the program.
Note you must have the required modules which are not included in git:
+ connect-flash
+ ejs
+ express

### Project Assignment 03
This section contains the updates made to the project, separated as the individual files.

#### app.js
- Added POST for /new-user action, called when a user registers for Chirper.
- Added POST for /new-chirp action, called when a logged in user makes a Chirp.
- Added POST for /search action, which is called when a user enters a search query.
- Added GET for /:user path, which is used in search function.
- Added GET for /follow/:user path, which is used to follow/unfollow a user.

## Documentation

Chirper documentation can be viewed by visiting the **/docs** directory

*Ex: localhost:3000/docs*

Documentation includes the following directories

+ /lib
+ /routes