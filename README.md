# **[ project name ]**

* **[ goals ]**
 * provide visual overview of all HYF modules
 * make it possible for students to interact with HYF module material
 * [ optional goal 1 ]
 * [ optional goal 2 ]

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