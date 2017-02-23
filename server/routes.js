module.exports = function(app) {
    const modules = require('./api/modules'); // Modules tabel API
    const accounts = require('./api/accounts'); // Accounts tabel API

    // modules HTTP methods
    app.get('/modules', modules.list);
    app.get('/modules/:id', modules.module_details);
    app.post('/modules', modules.add);
    app.patch('/modules/:id', modules.update);
    app.delete('/modules/:id', modules.delete_module);
    // accounts HTTP methods
    app.get('/accounts', accounts.list);
    app.get('/accounts/:id', accounts.account_details);
    app.post('/accounts', accounts.add);
    app.patch('/accounts/:id', accounts.update);
    app.delete('/accounts/:id', accounts.delete_account);
};