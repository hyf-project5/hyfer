import angular from 'angular';

import usersModule from './users.module';
import backendService from '../services/backendService';
import toastService from '../services/toastService';
import template from './users.component.html';
import './users.scss';

class UsersController {

    static get $inject() {
        return ['$state', '$mdDialog', toastService, backendService, 'me'];
    }

    constructor($state, $mdDialog, toastService, backendService, me) {
        this.backendService = backendService;
        this.me = me;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.toastService = toastService;
    }

    $onInit() {
        document.getElementById('content').scrollTop = 0;
        for (const val of this.users) {
            if (!val.github_username) {
                val.github_username = "random";
            }
        }
    }

    updateUserRole(userId, role) {
        this.backendService.updateUserRole(userId, role.toLowerCase())
            .then(() => {
                this.users.forEach(user => {
                    if (user.id === userId) {
                        this.toastService.displayToast(true, `${user.username}'s role updated to ${role.toLowerCase()}!`);
                        this.$state.reload();
                    }
                });
            }).catch(err => console.log(err));
    }

    updateMyRole(userName, ev, userId, role) {
        const confirm = this.$mdDialog.confirm()
            .title('Would you like to update your role?')
            .ariaLabel('Update your role!')
            .targetEvent(ev)
            .ok('Ok')
            .cancel('Cancel');
        this.$mdDialog.show(confirm)
            .then(() => {
                this.updateUserRole(userId, role);
                location.reload();
                this.$state.go('timeline');
            })
            .catch(() => false);
    }
    selectedRole(userId, role, username, ev) {
        if (this.me.username === username) {
            if (!this.updateMyRole(username, ev, userId, role)) {
                return;
            }
        }
        this.updateUserRole(userId, role);
    }

}

const componentName = 'hyfUsers';

angular
    .module(usersModule)
    .component(componentName, {
        template,
        controller: UsersController,
        bindings: {
            users: '<'
        }
    });

export default componentName;