## format

**user story name**

`METHOD /route1/:id`
* data : `{ field1: 1, field2: 'string' }` // [optional]
* returns : `{ field1: 'string', field2: 'anotherString'}` // [optional] 


## API routes

1. User -> I should be able to see a timeline of all current active classes and their running modules

`GET /classes`
* returns `[ { id, name, [module 1, module 2] } ]`

`GET /classes/:id`
* returns `{ id, name, [module 1, module 2] }`

2. User -> I should be able to select / click a module and then see the corresponding GitHub course content README + link.
- no endpoints needed, all data here.

3. User -> I should be able to login using my GitHub account.
- NVT / NA.

---
