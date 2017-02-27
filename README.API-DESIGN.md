## info / tools

- [HTTP status codes](http://www.restapitutorial.com/httpstatuscodes.html)
- [UUID generator](https://www.uuidgenerator.net/) < but when to use them ? not always!

## format

1. userstory name ➜ number)

	- [ ] `METHOD /route1/:param`    
	⇧ `{ field1: 1, field2: 'string' } // put, patch, post data`    
	→  `{ field1: 'string', field2: 'anotherString'} // return`

## user stories

- **User** ➜ 1) I should be able to see a timeline of all current active classes and their running modules

	- [ ] `GET /classes`    
	→ `[ { id, name, [module 1, module 2] } ]`

	- [ ] `GET /classes/:id`    
	→ `{ id, name, [module 1, module 2] }`

- **User** ➜ 2) I should be able to select / click a module and then see the corresponding GitHub course content README + link.
   
   - [x] NA.
   
- **User** ➜ 3) I should be able to login using my GitHub account.
	
	- [x] NA.

---

- **Teacher** 1) ➜ I want a basic login / authentication system with a seeded Administrator account using federated login (GitHub).
   
   - [x] NA.
   
- **Teacher** 2) ➜ I want to be able to add a new class. This automagically adds the entire ordered curriculum as we know it (from the module sequence numbers).

	- [ ] `POST /classes`    
	⇧ `{ className: 'class5', [startingDate: 2017-04-12] } // modules = default, not needed.`    
	→  `[ { id, name, [module 1, module 2] } ]`  
	→  `403 BAD REQUEST` // bad data given  
	→  `400 FORBIDDEN` // role not teacher
	
- **Teacher** 3) ➜ I want to be able to add a new module.

	- [ ] `POST /classes`  
	⇧ `?`  
	→  `200 OK`  
	→  `403 BAD REQUEST` // bad data given  
	→  `400 FORBIDDEN` // role not teacher

- **Teacher** 4) ➜ I want to be able to assign a module to a class (this module will be a running module).

	- [ ] `PUT /classes/:id`    
	⇧ `{ moduleIds: [1, 3, 4, 5] }`    
	→  `200 OK`    
	→  `403 BAD REQUEST` // bad data given    
	→  `400 FORBIDDEN` // role not teacher

- **Teacher** ➜ 5) I want to be able to edit the list of running modules belonging to a class.  
**Teacher** ➜ 6) I want to be able to assign teachers to a running module.  
**Teacher** ➜ 8) I want to be able to edit a running module (for a class) duration (week less, week longer).

	- user story is basically about an intermediate table between class and module.
		   - intermediate table contains references to class, module AND module specific overrides (duration, switch, etc.)
		   - change the duration of a running module.    			`3 weeks ->   4 weeks`
	       - change order / sequence of the running modules. `1 -> 2  =>   2 -> 1`
	
	- [ ] `PATCH /classes/:id`    
	⇧ ` [ { runningModuleId: 143, duration: 4, sequence: 1001 } ] }`    
	→  `200 OK`    
	→  `403 BAD REQUEST` // bad data given    
	→  `400 FORBIDDEN` // role not teacher

- **Teacher** ➜ 7) I want to be able to edit (default) module details (duration, name, etc).

	- `app.patch('/modules/:id', modules.update);`

	- [ ] `PATCH /modules/:id`    
	⇧ `{ moduleId: 92, name: 'TypeScript', duration: 6, sequence: 9005 }`    
	→  `200 OK`    
	→  `403 BAD REQUEST` // bad data given    
	→  `400 FORBIDDEN` // role not teacher
	
