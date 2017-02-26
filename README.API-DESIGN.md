## format

**user story name**

`METHOD /route1/:id`
* data : `{ field1: 1, field2: 'string' }` // [optional]
* returns : `{ field1: 'string', field2: 'anotherString'}` // [optional] 


## API routes

**user story 1**

`GET /classes`
* returns `[ { id, name, [module 1, module 2] } ]`

`GET /classes/:id`
* returns `{ id, name, [module 1, module 2] }`
