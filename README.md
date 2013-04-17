# CMPSCI 326 Web Programming: Team King Pine

# Chirper

## Chirper helps you keep tabs on what you care about most

### How to Run
Our application can be run by running 'node app.js' in the root directory of the program.
Note you must have the required modules which are not included in git:
+ connect-flash
+ ejs
+ express
+ socket.io
+ sequelize

Run 'npm install' in the root directory to install the above modules.

- - -

### Project Assignment 04
This section contains the update we made to the project, separated as the individual files.

1. A suggestions dropdown in the search box powered by AJAX
2. Posting of chirps in the home page without a reload, powered by socket.IO.
3. Other miscellaneous bugfixes and code cleanup.

Note that node_modules has been updated.  Be sure to run 'npm install' again to get the latest packages in order to run.

#### app.js
- Updated the way the server is started to also start a socket listening.
- Changed some routing around.  /login and /signup are no longer accessible alone.  This was done as a bug fix.
	- They can still be accessed and will redirect to the index, as a user-experience consideration.

#### chirps.js
- Began to create functions to return arrays of chirps based on page requirements, such as friends-only or limited to number.
- This allows us to follow the concept of Socket/IO as not needing GET and POST requests, with the data instead coming from the encapsulated functions.

#### user.js
- Created autocomplete function which manages the return values of the new AJAX implementation.
- Created unlookup (username lookup) function which serves as the opposite of idLookup.  This was originally removed but has use now.

#### chirp-socket.js
- Created this file, which contains the export function to initialize and run a listening socket for the Socket/IO part of the project.

#### discover.js
- Minor updates: Function names to match changes made in chirps.js

#### home.js
- Updated the way data is passed to render the home.ejs view with new formatting.

#### index.js
- Created logout function.

#### me.js
- Minor updates: Made sure everything lined up with the new way we're going about presenting chirps, based on updates to chirps.js.

#### user-sessions.js
- Created different logout function.  We will determine how to implement one, the other, or a combination in time.

#### All main views
- Updated formatting for an updated interface.

#### home.ejs
- Added connection for the socket, and the code for it listening for an event on the textbook that chirps are submitted through.
- Renamed the labels in the HTML of the text box to match with that of the socket.

#### navbar.ejs
- Added buttons to log in or log out.
- Added calls to run the AJAX search box.

#### public/javascripts/autocomplete.js
- Created file, which is the backbone for the logic behind the AJAX search box.

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
#### This section contains updates that do not correspond to a specific project, but are added to create additional functionality or to fix problems listed by the graders.
- Updated navbar to display "Log In or Sign Up" instead of a user on search page if nobody logged in.
	- This also fixes the search results page breaking if nobody is logged in.
- Updated logic to deal with searching for users that don't exist by flashing error messages.
- Created 404 page.

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