module.exports = function (app) {
  let modules = require('./api/modules'); // Modules Tabels API

  app.get('/modules', modules.list);
  app.get('/modules/:id', modules.module_details);
  app.post('/modules', modules.add);
};
