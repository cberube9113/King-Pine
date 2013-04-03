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
- Updated route information to match updates to routes and views.
- Added POST for /new-user action, called when a user registers for Chirper.
- Added POST for /new-chirp action, called when a logged in user makes a Chirp.
- Added POST for /search action, which is called when a user enters a search query.
- Added GET for /:user path, which is used in search function.
- Added GET for /follow/:user path, which is used to follow/unfollow a user.

#### chirps.js
- Created function (newChirp) to add a new Chirp to the database and its corresponding export function (addChirp).

#### follow.js
- Created function (followdbUpdate) to be implemented by pages where a user can select to follow another user.

#### idlookup.js
- Removed this library, merged its functionality with user.js.

#### user.js
- Created idlookup function based on functionality from idlookup.js, matches a given username with its UID.
- Created usernamelookup function, matching a given UID with its username.
- Edited login function to provide functionality to user-sessions route.

## Documentation

Chirper documentation can be viewed by visiting the **/docs** directory

*Ex: localhost:3000/docs*

Documentation includes the following directories

+ /lib
+ /routes