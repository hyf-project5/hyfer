import angular from 'angular'

import appModule from './app.module'
import './app.config'
import './toolbar/toolbar.component'
import './toolbar/childToolbar.component'
import './toolbar/toolbar.service'
import backendService from './services/backendService'

const defaultMe = {
  username: 'visitor',
  full_name: 'Visitor',
  role: 'visitor'
}

run.$inject = ['$cookies', backendService, 'me']

function run($cookies, backendService, me) {
  const token = $cookies.get('token')
  if (token) {
    const jwt = token.slice(1, -1)
    window.localStorage.setItem('token', jwt)
  }

  if (window.localStorage.getItem('token')) {
    backendService.getMyProfile()
      .then(profile => {
        me.username = profile.username
        me.full_name = profile.full_name,
          me.role = profile.role,
          me.group_name = profile.group_name
      })
      .catch(err => {
        window.localStorage.removeItem(token)
        console.warn(`getMyProfile error: ${err.message}`)
      })
  }
}

angular.module(appModule)
  .value('me', defaultMe)
  .run(run)
