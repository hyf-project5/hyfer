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

- Use the command line to load the most recent version of the schema SQL file from the `sql` folder into the database:

    `mysql -u` _user-name_ `-p` _database-name_ `<` _sql-file_

- Next, repeat this command to load the sample data SQL file from the `sql` folder into the datavbase.

- create a `config.js` file in the `server/config` folder, paste the contents of the `config.sample.js` file into it, and modify to reflect your specific database configuration.

### Run the server and webpack in watch mode

```
npm start
```

Webpack will initially take some time to transpile the client source files. The first time it is run it will create a `build` folder in the project folder. Please copy the `index.hmtl` file from the `client` folder to the `build` folder. This needs to be done only once. You can now acces the app at `http://localhost:3002`.

Because Webpack runs in watch mode, there is no need to rerun `npm start` when making changes to the client code. Webpack will retranspile the changes. Just refresh the browser.

### Admin functions

Certain admin tasks require a `teacher` role. To initially give yourself this role you need to sign-in with GitHUb and then use the `my-sql` command line or the MySQL Workbench to change your role in the `users` table from `guest` to `teacher`.

### Data model

![datamodel](https://cloud.githubusercontent.com/assets/2788771/23826619/3389b8e6-06a0-11e7-9187-9a5ca4f8bf99.png)
