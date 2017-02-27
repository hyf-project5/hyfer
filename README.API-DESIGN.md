## Format

**user story name**

`METHOD /route1/:param`    
⇧ `{ field1: 1, field2: 'string' } // put, patch, post data`    
→  `{ field1: 'string', field2: 'anotherString'} // 200 OK + data`

## user stories
1. User -> I should be able to see a timeline of all current active classes and their running modules

	`GET /classes`    
	→ `[ { id, name, [module 1, module 2] } ]`

	`GET /classes/:id`    
	→ `{ id, name, [module 1, module 2] }`

2. **User** ➡ I should be able to select / click a module and then see the corresponding GitHub course content README + link.
   - ✅ NA.
   
3. **User** ➡ I should be able to login using my GitHub account.
	- ✅ NA.

1. **Teacher** ➡ I want a basic login / authentication system with a seeded Administrator account using federated login (GitHub).
   - ✅ NA.
   
2. **Teacher** ➡ As a teacher I want to be able to add a new class. This automagically adds the entire ordered curriculum as we know it (from the module sequence numbers).

	`POST /classes`    
	⇧ `{ className: 'class5', [startingDate: 2017-04-12] } // modules = default, not needed.`    
	→  `[ { id, name, [module 1, module 2] } ]`
	
7. **Teacher** ➡ I want to be able to add a new module.

	`POST /classes`    
	⇧ `?`    
	→  `?`

3. **Teacher** ➡ I want to be able to assign a module to a class (this module will be a running module).

	`PATCH /classes/:id`    
	⇧ `{ moduleIds: [1, 3, 4, 5] }`    
	→  `?`
