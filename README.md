# Class 5 Project

- User stories must be mappable to SQL CRUD operations
- The front-end is just presentation
- Admin roles are not currently covered

## User stories

### User


- 1) I should be able to see a timeline of all current active curriculums and their groups/classes.
- 2) I should be able to select / click a module and then see the corresponding GitHub course content README + link.
- 3) I should be able to login using my GitHub account.

### Teachers

- 1) Have a basic login / authentication system im place with a seeded Administrator account, using federated login (GitHub).
- 2) As a teacher I want to be able to add a new class. This automagically adds the entire ordered curriculum as we know it.

- 3) I want to be able to add a new module.
- 4) I want to be able to assign modules to a curriculum.
- 5) I want to be able to assign teachers to a module.
- 6) I want to be able to edit module duration (week less, week longer)


update stuff later

    - new entity: curriculum
        - is ordered (1 - html/css, 2 - js, etc.)
        - contains modules
        - new class adds entire curriculum
        - has starting date

    - changed entity: module
        - has duration (number of weeks: 3, 6)
        - has title (typescript, vacation, more javascript, hackday)
        
    - changed entity: group
        - has a name (class5 / group5)
        - has a starting date
        - has a graduated flag (boolean : yes / no)
       


# **Requirements**

* **Install dependencies**
  * *Install node&npm :* if you haven't yet : [Node.js and NPM](http://nodejs.org/)
  * *Run the following :* `npm install`
* **NOTE**
  * *CREATE DB :* first you should create the database(this is currently) to do so do the following:
  

  In your MySQL shell run `mysql -u -p root  DB-name < DIRECTORY/DB_Schema.sql`
  * notes that the `DB_Schema.sql` file is important to create all the required tables...
  

  then create `config.js` file in the database folder, and the paste in it the content of
  the `config.js.txt` file with the corresponding data..


  * *now just run `npm start`*
