import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import 'angular-material/angular-material.css';

import './index.css';
import './readme.css';

angular.module('hyferApp', [uiRouter, ngMaterial, ngCookies]);