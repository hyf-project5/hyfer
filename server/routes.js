module.exports = function (app) {
  let users = require('./api/users');   //API
  let lessons = require('./api/lessons'); //Lessons Tables API
  let classes = require('./api/classes'); // Classes Tabels API
  let announce = require('./api/announce'); // Announce Tabels API
  let modules = require('./api/modules'); // Modules Tabels API

  app.get('/', users.home);
  app.get('/users', users.list);
  app.get('/users/:id', users.user);
  app.get('/users/add', users.add);
  app.post('/users/add', users.save);
  app.delete('/users/delete/:id', users.delete_user);
  app.get('/users/edit/:id', users.edit);
  app.post('/users/edit/:id', users.save_edit);

  // app.get('/les', lessons.lessons);
  app.get('/lessons', lessons.list);
  app.get('/lessons/:id', lessons.lesson)
  //app.get('/lessons/:id', lessons.lessonDetails);
  app.get('/lessons/add', lessons.add);
  app.post('/lessons/add', lessons.save);
  app.delete('/lessons/delete/:id', lessons.delete_lesson);
  app.get('/lessons/edit/:id', lessons.edit);
  app.post('/lessons/edit/:id', lessons.save_edit);

  // app.get('/cls', classes.classes);
  app.get('/classes', classes.list);
  app.get('/classes/add', classes.add);
  app.post('/classes/add', classes.save);
  app.delete('/classes/delete/:id', classes.delete_class);
  app.get('/classes/edit/:id', classes.edit);
  app.post('/classes/edit/:id', classes.save_edit);

  app.get('/announce', announce.list);
  app.get('/announce/:id', announce.announcement);
  app.get('/announce/add', announce.add);
  app.post('/announce/add', announce.save);
  app.delete('/announce/delete/:id', announce.delete_announce);
  app.get('/announce/edit/:id', announce.edit);
  app.post('/announce/edit/:id', announce.save_edit);

  app.get('/modules', modules.list);
  app.get('/modules/add', modules.add);
  app.post('/modules/add', modules.save);
  app.delete('/modules/delete/:id', modules.delete_module);
  app.get('/modules/edit/:id', modules.edit);
  app.post('/modules/edit/:id', modules.save_edit);

};