import angular from 'angular';

import appModule from './app.module';
import './app.routing'
import './toolbar/toolbar.component';
import backendService from './services/backendService';

const defaultMe = {
    username: 'visitor',
    role: 'visitor'
}

run.$inject = ['$cookies', backendService, 'me'];

function run($cookies, backendService, me) {

    let token = $cookies.get('token')
    if (token) {
        let jwt = token.slice(1, -1);
        window.localStorage.setItem('token', jwt);
    }

    if (window.localStorage.getItem('token')) {
        backendService.getMyProfile()
            .then(profile => {
                me.username = profile.username;
                me.role = profile.role;
            })
            .catch(err => {
                window.localStorage.removeItem(token);
                console.warn(`getMyProfile error: ${err.message}`);
            })
    }
}

angular.module(appModule)
    .value('me', defaultMe)
    .run(run)