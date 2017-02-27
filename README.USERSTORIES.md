
### User
---
1. I should be able to see a timeline of all **active classes** and their **running modules**.
2. I should be able to select / click a **module** and then see the corresponding GitHub course content README + link.
3. I should be able to login using my GitHub account.


### Teachers
---
1. Have a basic login / authentication system im place with a seeded Administrator account, using federated login (GitHub).
2. As a **teacher** I want to be able to add a new **class**. The **running module** list of this class gets populated by all existing **modules** in the order that the **module sequence** defines (i.e. HTML/css = 1001, Js 1 = 2001, Js 2 = 2002 etc.)

3. I want to be able to add a new **module**.
4. I want to be able to assign **modules** to a list of **running modules**.
5. I want to be able to assign **teachers** to a **module**.
6. I want to be able to edit **module** duration (week less, week longer).


### Definition list
---
- *timeline* : a component that shows an overview of all **active classes** and their **running modules**'.
- *active classes* : all **classes** that are currently active.
- *class* : a group of students that are following a list of **running modules** (sometimes referred to as *curriculum*).
- *running module* : a **module** that is currently active in one or more **curriculum**'.
- *module* : aka *a course*. A (by default) 3-week course associated with a GitHub repo containing course material.
- *teacher* : a type of user that is responsible for providing and updating course content.

### DB entities (new and changed)
---

    - new entity: curriculum
        - is ordered (1 - html/css, 2 - js, etc.)
        - contains modules
        - new class adds entire curriculum
        - has starting date

    - changed entity: module
        - has duration (number of weeks: 3, 6)
        - has a (default) sequence number: (HTML/css could be 1001, Javascript 1 could be 2001)
        - has title (typescript, vacation, more javascript, hackday)
        
    - changed entity: group
        - has a name (class5 / group5)
        - has a starting date
        - has a graduated flag (boolean : yes / no)
