## format

**user story name**
  * METHOD /route1
  ** [optional] data : {}
  ** [optional] returns : { field1: 'string', field2: 'anotherString'}
    
  * METHOD /route2/:id
  ** [optional] data : { field1: 1, field2: 'string' }


## API routes

**user story 1**

GET /classes

GET /classes/:id
  returns { id, name, [module 1, module 2] }
