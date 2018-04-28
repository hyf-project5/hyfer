'use strict'
const httpRequest = require('request')
const marked = require('marked')
const LRU = require('lru-cache')
const config = require('../config/config')

const API_BASE_URL = 'https://api.github.com'
const ONE_DAY_IN_MSECS = 24 * 60 * 60 * 1000

const cache = LRU({
  max: 100,
  maxAge: ONE_DAY_IN_MSECS
})

function githubRequest(url) {
  return new Promise((resolve, reject) => {
    const request = {
      url,
      json: true,
      headers: {
        'User-Agent': 'hackyourfuture',
        'Authorization': 'token ' + config.githubToken
      }
    }
    httpRequest.get(request, (error, response) => {
      if (error) {
        reject(error)
      } else {
        resolve(response.body)
      }
    })
  })
}

function getTeams(req, res) {
  githubRequest(`${API_BASE_URL}/orgs/hackyourfuture/teams`)
    .then(teams => res.send(teams))
    .catch(() => res.sendStatus(500))
}

function getTeamMembers(req, res) {
  const { id } = req.params
  githubRequest(`${API_BASE_URL}/teams/${id}/members`)
    .then(members => {
      const promises = members.map(member => githubRequest(member.url))
      return Promise.all(promises)
        .then(users => users.map(user => ({
          login: user.login,
          name: user.name,
          email: user.email
        })))
    })
    .then(users => res.send(users))
    .catch(() => res.sendStatus(500))
}

function getReadMeAsHtml(req, res) {
  const owner = req.params.owner
  const repo = req.params.repo
  const ownerAndRepo = `${owner}/${repo}`

  let promise
  const html = cache.get(ownerAndRepo)
  if (html) {
    console.log('README cache hit for: ' + ownerAndRepo)
    promise = Promise.resolve(html)
  } else {
    console.log('README cache miss for: ' + ownerAndRepo)
    promise = new Promise((resolve, reject) => {
      const request = {
        url: `${API_BASE_URL}/repos/${ownerAndRepo}/readme`,
        json: true,
        headers: {
          'User-Agent': 'hackyourfuture'
        }
      }
      httpRequest.get(request, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log('README received from GitHub')
          const md = Buffer.from(body.content, 'base64').toString()
          const html = marked(md, {
            breaks: true,
            smartypants: true
          })
          cache.set(ownerAndRepo, html)
          resolve(html)
        } else {
          reject(error)
        }
      })
    })
  }

  promise.then(html => res.send(html))
    .catch(() => res.sendStatus(404))
}

module.exports = {
  getReadMeAsHtml,
  getTeams,
  getTeamMembers
}
