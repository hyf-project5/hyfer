# Class 5 Project

- User stories must be mappable to SQL CRUD operations
- The front-end is just presentation
- Admin roles are not currently covered

## Documentation

* [Overview of user stories](https://github.com/hyf-project5/super-duper-5/blob/master/docs/README.USERSTORIES.md)
* [API Design](https://github.com/hyf-project5/super-duper-5/blob/master/docs/README.API-DESIGN.md)
* [OAuth](https://github.com/hyf-project5/super-duper-5/blob/master/docs/README.GitHubOAuth.md)
* [Data Layer](https://github.com/hyf-project5/super-duper-5/blob/master/docs/README.datalayer.md)
* [API end points](https://github.com/hyf-project5/hyfer/blob/master/docs/README.api-endpoints.md)

## Installation


### Install dependencies

```
npm install
```

### Database

This application requires a MySQL database.

- Create an empty database and a MySQL user with rights to the database.
To be extended.

* **NOTE**
  * *CREATE DB :* first you should create the database(this is currently) to do so do the following:

  In your MySQL shell run `mysql -u[username] -p[password] [DB name] < DIRECTORY/DB_Schema_v3.sql`
  * notes that the `DB_Schema.sql` file is important to create all the required tables...

  then create a `config.js` file in the `server/config` folder and paste in it the contents of
  the `config.js.txt` file, and modify to reflect your specific database configuration.

  * *now just run `npm start`*

### Admin functions

Certain admin tasks require a `teacher` role. To initially give yourself this role you need to sign-in with GitHUb and then use the `my-sql` command line or the MySQL Workbench to change your role in the `users` table from `guest` to `teacher`.
