
### User
---
- **User** ➜ 1) I should be able to see a timeline of all **active classes** and their **running modules**.
- **User** ➜ 2) I should be able to select / click a **module** and then see the corresponding GitHub course content README + link.
- **User** ➜ 3) I should be able to login using my GitHub account.


### Teachers
---
- **Teacher** ➜ 1) Have a basic login / authentication system im place with a seeded Administrator account, using federated login (GitHub).
- **Teacher** ➜ 2) I want to be able to add a new class. This automagically adds the entire ordered curriculum as we know it (from the module sequence numbers, i.e. HTML/css = 1001, Js 1 = 2001, Js 2 = 2002 etc.).

- **Teacher** ➜ 3) I want to be able to add a new module.
- **Teacher** ➜ 4) I want to be able to assign a module to a class (this module will be a running module).

- **Teacher** ➜ 5) I want to be able to edit the list of running modules belonging to a class.
- **Teacher** ➜ 6) I want to be able to assign teachers to a module.
- **Teacher** ➜ 7) I want to be able to edit (default) module details (duration, name, etc).
- **Teacher** ➜ 8) I want to be able to edit a running module (for a class) duration (week less, week longer).



### Definition list
---
- *timeline* : a component that shows an overview of all **active classes** and their **running modules**'.
- *active classes* : all **classes** that are currently active.
- *class* : a group of students that are following a list of **running modules**.
- *running module* : a **module** that is currently actively taught in one or more **classes**.
- *curriculum* : a *default* list of **running modules** (used to populate new classes with).
- *module* : aka *a course*. A (by default) 3-week course associated with a GitHub repo containing course material.
- *teacher* : a type of user that is responsible for providing and updating course content.

### DB entities (new and changed)
---

    - new entity: running module
        - creating a new class adds an entire list of these: **the curriculum**
        - has starting date, inherited/calculated by class start date + # previous modules * their duration.
        - has a finish date, inherited/calculated by class start date + # previous modules * their duration + this module duration.

    - changed entity: module
        - has duration (number of weeks: 3, 6)
        - has a (default) sequence number: (HTML/css could be 1001, Javascript 1 could be 2001)
        - has title (typescript, vacation, more javascript, hackday)
        
    - changed entity: class / group
        - has a name (class5 / group5)
        - has a starting date
        - has a **finished** flag (boolean : yes / no)
        
        
    
