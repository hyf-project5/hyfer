'use strict'
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const compose = require('composable-middleware')
const config = require('../config/config')
const users = require('../datalayer/users')

const validateJwt = expressJwt({ secret: config.jwtSecret })
const EXPIRES_IN_SECONDS = 30 * 24 * 60 * 60 // 30 days

function gitHubCallback(req, res, next) {
  getConnection(req, res)
    .then(con => {
      return users.getUser(con, req.user.username)
        .then(rows => {
          if (rows.length === 0) {
            const newUser = {
              username: req.user.username,
              access_token: req.user.accessToken,
              full_name: req.user.full_name,
              email: req.user.email,
              role: 'guest'
            }
            return users.addUser(con, newUser)
          }
          return Promise.resolve()
        })
    })
    .then(() => next())
    .catch(err => console.log('Error from gitHubCallback: ' + err))
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    .use((req, res, next) => validateJwt(req, res, next))
    .use((req, res, next) => {
      getConnection(req, res)
        .then(con => {
          return users.getUser(con, req.user.username)
            .then(rows => {
              if (rows.length > 0) {
                req.user = rows[0]
                next()
              } else {
                res.sendStatus(403)
              }
            })
        })
        .catch(err => console.log(err))
    })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(role) {
  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (role === req.user.role) {
        next()
      } else {
        res.sendStatus(403)
      }
    })
}

function getConnection(req, res) {
  return new Promise((resolve, reject) => {
    req.getConnection((err, con) => {
      if (err) {
        res.sendStatus(500)
        reject(err)
      } else {
        resolve(con)
      }
    })
  })
}

function signToken(username) {
  return jwt.sign({ username }, config.jwtSecret, { expiresIn: EXPIRES_IN_SECONDS })
}

function setTokenCookie(req, res) {
  if (!req.user) {
    return void res.statusStatus(404)
  }
  const token = signToken(req.user.username)
  res.cookie('token', JSON.stringify(token), { maxAge: EXPIRES_IN_SECONDS * 1000 })
  res.redirect(config.url + '/#!/timeline')
}

module.exports = {
  gitHubCallback,
  setTokenCookie,
  isAuthenticated,
  hasRole
}
