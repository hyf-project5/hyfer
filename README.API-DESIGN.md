## Format

**user story name**
- specific user story information, what was discussed in class, etc.
- [ ] `METHOD /route1/:param`    
⇧ `{ field1: 1, field2: 'string' } // put, patch, post data`    
→  `{ field1: 'string', field2: 'anotherString'} // 200 OK + data`

## user stories

1. **User** ➜ I should be able to see a timeline of all current active classes and their running modules

	- [ ] `GET /classes`    
	→ `[ { id, name, [module 1, module 2] } ]`

	- [ ] `GET /classes/:id`    
	→ `{ id, name, [module 1, module 2] }`

2. **User** ➜ I should be able to select / click a module and then see the corresponding GitHub course content README + link.
   
   - [x] NA.
   
3. **User** ➜ I should be able to login using my GitHub account.
	
	- [x] NA.

---

1. **Teacher** ➜ I want a basic login / authentication system with a seeded Administrator account using federated login (GitHub).
   
   - [x] NA.
   
2. **Teacher** ➜ I want to be able to add a new class. This automagically adds the entire ordered curriculum as we know it (from the module sequence numbers).

	- [ ] `POST /classes`    
	⇧ `{ className: 'class5', [startingDate: 2017-04-12] } // modules = default, not needed.`    
	→  `[ { id, name, [module 1, module 2] } ]`
	
3. **Teacher** ➜ I want to be able to add a new module.

	- [ ] `POST /classes`    
	⇧ `?`    
	→  `?`

4. **Teacher** ➜ I want to be able to assign a module to a class (this module will be a running module).

	- [ ] `PATCH /classes/:id`    
	⇧ `{ moduleIds: [1, 3, 4, 5] }`    
	→  `?`

5. **Teacher** ➜ I want to be able to edit the list of running modules belonging to a class.

	- user story is basically about an intermediate table between class and module.
		   - intermediate table contains references to class, module AND module specific overrides (duration, switch, etc.)
		   - change the duration of a running module.    			`3 weeks ->   4 weeks`
	       - change order / sequence of the running modules. `1 -> 2  =>   2 -> 1`
	
	- [ ] `?`    
	⇧ `?`    
	→  `?`
	
6. **Teacher** ➜ I want to be able to assign teachers to a running module.

	- this is basically editing of the running module list, too, covered by ➜ **teacher** 5.

	- [ ] `?`    
	⇧ `?`    
	→  `?`

7. **Teacher** ➜ I want to be able to edit (default) module details (duration, name, etc).

	- `app.patch('/modules/:id', modules.update);`

	- [ ] `PATCH /modules/:id`    
	⇧ `?`    
	→  `?`
