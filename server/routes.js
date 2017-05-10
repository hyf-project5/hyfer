'use strict'
const passport = require('passport')
require('./auth/githubAuth')
const auth = require('./auth/authService')
const github = require('./api/github')
const users = require('./api/users')

const modules = require('./api/modules')
const running = require('./api/runningModules')
const groups = require('./api/groups')
const history = require('./api/history')
const states = require('./api/states')

module.exports = function (app) {

  app.route('/api/modules')
    .get(auth.isTeacher(), modules.getModules)
    .post(auth.isTeacher(), modules.addModule)
    .patch(auth.isTeacher(), modules.updateModules)

  app.route('/api/modules/:id')
    .patch(auth.isTeacher(), modules.updateModule)
    .delete(auth.isTeacher(), modules.deleteModule)

  app.get('/api/running/:groupId', auth.isTeacher(), running.getRunningModules)
  app.patch('/api/running/update/:groupId/:position', auth.isTeacher(), running.updateRunningModule)
  app.patch('/api/running/split/:groupId/:position', auth.isTeacher(), running.splitRunningModule)
  app.patch('/api/running/add/:moduleId/:groupId/:position', auth.isTeacher(), running.addModuleToRunningModules)
  app.delete('/api/running/:groupId/:position', auth.isTeacher(), running.deleteRunningModule)

  app.route('/api/groups')
    .get(groups.getTimelineForAllGroups)
    .post(auth.isTeacher(), groups.addGroup)

  app.route('/api/groups/:id')
    .get(groups.getTimelineForAGroup)
    .patch(auth.isTeacher(), groups.updateGroup)
    .delete(auth.isTeacher(), groups.deleteGroup)

  app.get('/api/github/readme/:owner/:repo', github.getReadMeAsHtml)

  app.get('/api/user', auth.isAuthenticated(), users.getUser)
  app.get('/api/users', auth.isAuthenticated(), users.getUsers)
  app.patch('/api/user/:id', auth.isTeacher(), users.updateRole)
  app.get('/api/user/:id', auth.isTeacher(), users.getUserById)

  app.patch('/api/history/:moduleId/:groupId', auth.isAuthenticated(), history.getHistory)
  app.post('/api/history', auth.isAuthenticated(), history.saveAttendances)

  app.get('/api/studentsState/:groupId', auth.isTeacher(), states.getStudentsState)
  app.patch('/api/studentsState', auth.isTeacher(), states.updateUser, states.assignToClass)

  app.get('/auth/github', passport.authenticate('github'))
  app.get('/auth/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    auth.gitHubCallback, auth.setTokenCookie)

  app.route('/*')
    .get((req, res) => res.sendFile('index.html', { root: app.get('docRoot') }))
}
