# Data Layer

The picture below depicts the position of the data layer in the server hierarchy.


![datalayer](https://cloud.githubusercontent.com/assets/2788771/23404592/08343df8-fdb6-11e6-9dd7-e61e7a059ddd.png)

The database layer is only concerned with executing SQL commands against the MySQL database. It should not be concerned with anything else: no `express` request handling or other stuff. Conversely, no other modules should bypass the data layer and directly run SQL queries against the database. This design principle is called *Separation of Concerns* (SoC) or *Single Responsibility Principle* (SRP).

The database layer export an interface with functions that return ES6 promises. By using promises we can write significantly cleaner code and handle errors at the point where it makes the most sense.