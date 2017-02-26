### User
---
1. I should be able to see a timeline of all current active curriculums and their groups/classes.
2. I should be able to select / click a module and then see the corresponding GitHub course content README + link.
3. I should be able to login using my GitHub account.


### Teachers
---
1. Have a basic login / authentication system im place with a seeded Administrator account, using federated login (GitHub).
2. As a teacher I want to be able to add a new class. This automagically adds the entire ordered curriculum as we know it.

3. I want to be able to add a new module.
4. I want to be able to assign modules to a curriculum.
5. I want to be able to assign teachers to a module.
6. I want to be able to edit module duration (week less, week longer)


### DB entities (new and changed)
---

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
