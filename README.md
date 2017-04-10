[![N|Solid](http://fo.ucf.edu/sites/default/files/images/Events.jpg)](https://nodesource.com/products/nsolid)
[![N|Solid](http://www.ucf.edu/brand/files/2016/07/UCF-Tab-Signature-lockup_horizontal-KG-7406-300x72.png)](https://nodesource.com/products/nsolid)
# COP4710 ~ College Event Website

### Developed by:
  - Jesse Lopez (Frontend)
  - Alex Kinlen (Backend)
  - Cody Young (Integration)




## Project Description

- Any student may register with this application to obtain a user ID and a password. There are three user levels: super admin who creates a profile for a university (name, location, description, number of students, pictures, etc.), admin who owns an RSO and may host events, and student
who uses the application to look up information about the various events.

- Admin can create events with name, event category, description, time, date, location, contact phone, and contact email address.  A location should be set from a map (Bing, Google, open street map) with name, latitude, longitude, etc. In order to populate the database, one can use feeds (e.g., RSS, XML) from events.ucf.edu.  Each admin is affiliated with one university, andone or more RSOs. A student user can request to create a new RSO or to join an existent one. A new RSO can be created with at least 5 other students with the same email domain, e.g.@knights.ucf.edu; and one of them should be assigned as an administrator.

- Student can view events in their university by location, or by selecting the University they want to see the events from. They can retrieve events according to their level of access or scope. A student should be able to see all the events around its location or from RSOs they are following.

- There are different types of events (social, fundraising, tech talks, etc.). Each event can be public, private, or an RSO event. Public events can be seen by everyone; private events can be seen by the students of the host university; and an RSO events can only be seen by members of the RSO. In addition, events can be created without an RSO.  Such events must be approved by the super admin.  After an event has been published, users can add, remove, and edit comments on the event, as well as rating the event with up to 5 stars. The application should offer some social network integration, e.g. posting from the application to Facebook or Google.



### Tech

College Events uses a number of open source projects to work properly:

* [EJS] - HTML enhanced for web apps!
* [Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - event I/O for the backend
* [XAMPP] - server for database
* [Express] - fast node.js network app framework
* [MySQL] - database
* [jQuery] - javascript library

And of course College Events itself is open source with a [public repository][git-repo-url]
 on GitHub.

### Installation

College Events requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh

# for db, install xampp run mysql and apache
    - configure db as stated below
    - import eventDB.sql to phpMyAdmin in a db named mydb
    
# for node web app, run in root directory
    $ npm install
    $ npm start
    
```

   [git-repo-url]: <https://github.com/jlopez29/DB_Website>
   [node.js]: <http://nodejs.org>
   [XAMPP]: <http://apachefriends.org>
   [Bootstrap]: <http://github.com/twbs/bootstrap/>
   [MySQL]: <http://mysql.com/>
   [EJS]: <http://embeddedjs.com/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
