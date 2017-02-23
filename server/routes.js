module.exports = function(app) {
    const modules = require('./api/modules'); // Modules tabel API

    app.get('/modules', modules.list);
    app.get('/modules/:id', modules.module_details);
    app.post('/modules', modules.add);
    app.patch('/modules/:id', modules.update);
    app.delete('/modules/:id', modules.delete_module);
};