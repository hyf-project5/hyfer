module.exports = function(app) {
    let module = require('./api/module'); // Modules Tabels API

    app.get('/module', module.list);
    app.get('/module/:id', module.module_details);
    app.post('/module', module.add);
    app.patch('/module/:id', module.update);
    app.delete('/module/:id', module.delete_module);
    // I changed the route to singular, we should definitely agree for which should we use ;)
};