# CMPSCI 326 Web Programming: Team King Pine

# Chirper

## Chirper helps you keep tabs on what you care about most

### How to Run
Our application can be run by running 'node app.js' in the root directory of the program.
Note you must have the required modules which are not included in git:
+ connect-flash
+ ejs
+ express

- - -

### Project Assignment 03
This section contains the updates made to the project, separated as the individual files.

#### app.js
- Updated route information to match updates to routes and views.
- Added POST for /new-user action, called when a user registers for Chirper.
- Added POST for /new-chirp action, called when a logged in user makes a Chirp.
- Added POST for /search action, which is called when a user enters a search query.
- Added GET for /:user path, which is used in search function.
- Added GET for /follow/:user path, which is used to follow/unfollow a user.
- Added GET for /spec, which redirects to the functional spec in docs and displays/downloads the PDF of it.

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

#### connect.js
- Updated render parameters to be use the newly added authentication functionality instead of static users.

#### discover.js
- Updated render parameters to be use the newly added authentication functionality instead of static users.

#### home.js
- Updated render parameters to be use the newly added authentication functionality instead of static users.

#### index.js
- Updated render parameters to be use the newly added authentication functionality instead of static users.

#### me.js
- Updated render parameters to be use the newly added authentication functionality instead of static users.
- Updated parameters of vars to also become dynamic based on the currently logged in user.

#### user-sessions.js
- Created route, to be used for functionality regarding user login and authentication.

#### navbar.ejs
- Created view file, navbar that can be easily inserted on any page where appropriate.
- Includes data such as links to other pages, information about the logged in user, and a search box.

#### searchresults.ejs
- Created view file, displays the user that was searched for.
- In reality is essentially a copy of "Me" page, but with the subject being the searched user.
- In the future, this page will likely be altered/merged with other pages but at the moment stands alone and is working.


### Ongoing Updates
- Updated navbar to display "Log In or Sign Up" instead of a user on search page if nobody logged in.
	- This also fixes the search results page breaking if nobody is logged in.

## Documentation

Chirper documentation can be viewed by visiting the **/docs** directory

*Ex: localhost:3000/docs*

Documentation includes the following directories

+ /lib
+ /routes

#### Functional Spec

The Functional Specification can be viewed by visiting the **/spec** directory.

*Ex: localhost:3000/spec*

The Functional Spec includes all the current information about the user experience of our site.
If your browser supports viewing a PDF, it will display within the browser.  Otherwise it will download it for offline viewing.